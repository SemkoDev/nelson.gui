#!/usr/bin/env node
const request = require('request');
const md5 = require('md5');
const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const program = require('commander');
const path = require('path');
const app = express();
const version = require('../package.json').version;

const parseNumber = (v) => parseInt(v);

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

program
    .version(version)
    .option('-p, --port [value]', 'Nelson GUI port', parseNumber, 5000)
    .option('-a, --apiPort [value]', 'Nelson API port', parseNumber, 18600)
    .option('-h, --apiHostname [value]', 'Nelson API hostname', 'mainnet.deviota.com')
    .parse(process.argv);

// Define the port to run on
app.set('port', process.env.NELSON_GUI_PORT || program.port);

app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/api', proxy);
app.get('/api/peers', proxy);

const salt = crypto.randomBytes(48).toString('hex');
// Listen for requests
const server = app.listen(app.get('port'), function() {
    console.log(`Nelson GUI running on port ${server.address().port}`);
});

const scramble = (str) => md5(`${salt}:${str}`).substr(0, 6);

function scramblePeer(peer) {
    return {
        ...peer,
        ip: scramble(peer.ip),
        hostname: scramble(peer.hostname)
    }
}

function proxy (req, resp) {
    const path = req.originalUrl.replace('/api', '');
    const url = `http://${program.apiHostname}:${program.apiPort}${path}`;
    const opts = { url };
    if (req.query.auth) {
        const tokens = req.query.auth.split(':');
        opts.auth = { user: tokens[0], pass: tokens[1] }
    }
    request(opts, (err, r, body) => {
        if (err) {
            console.log(`Unexpected error happened: ${err}`);
            resp.status(500);
            return;
        }
        if (r.statusCode === 401) {
            console.log('Remote access denied');
            resp.status(401);
            return;
        }
        try {
            const json = JSON.parse(body);
            let response = json;
            if (path.startsWith('peers') && !req.query.auth) {
                response = json.map(scramblePeer);
            } else if(response.connectedPeers && !req.query.auth) {
                response.connectedPeers = response.connectedPeers.map(scramblePeer)
            }
            resp.status(200).json(response);
        }
        catch (e) {
            console.log(`Remote returned unexpected response(${r.statusCode})`, e);
            resp.status(500);
        }
    })
}