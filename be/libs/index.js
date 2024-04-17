const fs = require("fs");
const path = require("path");
const fsp = require("fs/promises");
const cwd = process.cwd();

function uid() {
   return Number(`${Date.now().valueOf()}`.slice(6));
}

module.exports = { uid };
