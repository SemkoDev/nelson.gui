#!/usr/bin/env node
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var request = require('request');
var md5 = require('md5');
var crypto = require('crypto');
var express = require('express');
var bodyParser = require('body-parser');
var program = require('commander');
var path = require('path');
var app = express();
var version = require('../package.json').version;

var parseNumber = function parseNumber(v) {
    return parseInt(v);
};

process.on('unhandledRejection', function (reason, p) {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

program.version(version).option('-p, --port [value]', 'Nelson GUI port', parseNumber, 5000).option('-a, --apiPort [value]', 'Nelson API port', parseNumber, 18600).option('-h, --apiHostname [value]', 'Nelson API hostname', 'mainnet.deviota.com').parse(process.argv);

// Define the port to run on
app.set('port', process.env.NELSON_GUI_PORT || program.port);

app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/api', proxy);
app.get('/api/peers', proxy);

var salt = crypto.randomBytes(48).toString('hex');
// Listen for requests
var server = app.listen(app.get('port'), function () {
    console.log('Nelson GUI running on port ' + server.address().port);
});

var scramble = function scramble(str) {
    return md5(salt + ':' + str).substr(0, 6);
};

function scramblePeer(peer) {
    return _extends({}, peer, {
        ip: scramble(peer.ip),
        hostname: scramble(peer.hostname)
    });
}

function proxy(req, resp) {
    var path = req.originalUrl.replace('/api', '');
    var url = 'http://' + program.apiHostname + ':' + program.apiPort + path;
    var opts = { url: url };
    if (req.query.auth) {
        var tokens = req.query.auth.split(':');
        opts.auth = { user: tokens[0], pass: tokens[1] };
    }
    request(opts, function (err, r, body) {
        if (err) {
            console.log('Unexpected error happened: ' + err);
            resp.status(500);
            return;
        }
        if (r.statusCode === 401) {
            console.log('Remote access denied');
            resp.status(401);
            return;
        }
        try {
            var json = JSON.parse(body);
            var response = json;
            if (path.startsWith('peers') && !req.query.auth) {
                response = json.map(scramblePeer);
            } else if (response.connectedPeers && !req.query.auth) {
                response.connectedPeers = response.connectedPeers.map(scramblePeer);
            }
            resp.status(200).json(response);
        } catch (e) {
            console.log('Remote returned unexpected response(' + r.statusCode + ')', e);
            resp.status(500);
        }
    });
}

