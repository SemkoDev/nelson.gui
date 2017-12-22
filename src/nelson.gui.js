#!/usr/bin/env node
const express = require('express');
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
    .parse(process.argv);

// Define the port to run on
app.set('port', process.env.NELSON_GUI_PORT || program.port);

app.use(express.static(path.join(__dirname)));
app.all('/*/*', function (req, res) {
        res.sendfile('index.html');
});

// Listen for requests
const server = app.listen(app.get('port'), function() {
    console.log(`Nelson GUI running on port ${server.address().port}`);
});