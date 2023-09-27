const fs = require("fs");
const readlinePromises = require("readline/promises");
const { faker } = require("@faker-js/faker");
const ui = require("./src/user-interface");

(function () {
  try {    
    ui.run({ faker, fs, readlinePromises });
  } catch (err) {
    console.error(`> ERR: ${err.message}`);
  }
})();
