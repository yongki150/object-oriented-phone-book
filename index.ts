const fs = require("node:fs");
const readlinePromises = require("node:readline/promises");
const { faker } = require("@faker-js/faker");
const ui = require("./src/user-interface");
(function () {
  try {
    ui.run({ faker, fs, readlinePromises });
  } catch (err) {
    console.error(`> ERR: ${err.message}`);
  }
})();
