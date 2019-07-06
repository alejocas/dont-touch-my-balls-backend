const express = require('express');
const app = express();
const ioLib = require('socket.io');

module.exports = {
    app,
    ioLib
}