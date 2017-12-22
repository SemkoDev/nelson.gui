#!/usr/bin/env node
'use strict';

var express = require('express');
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

program.version(version).option('-p, --port [value]', 'Nelson GUI port', parseNumber, 5000).parse(process.argv);

// Define the port to run on
app.set('port', process.env.NELSON_GUI_PORT || program.port);

app.use(express.static(path.join(__dirname)));
app.all('/*/*', function (req, res) {
    res.sendfile(path.join(__dirname, 'index.html'));
});

// Listen for requests
var server = app.listen(app.get('port'), function () {
    console.log('Nelson GUI running on port ' + server.address().port);
});

