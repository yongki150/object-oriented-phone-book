const fs = require("fs");
const readlinePromises = require("readline/promises");
const { faker } = require("@faker-js/faker");
const ui = require("./src/user-interface");
const database = require("./src/trie");

(function () {
  try {
    database.loadList({ fs, readlinePromises });
    ui.run({ faker, fs, readlinePromises });
  } catch (err) {
    console.error(`> ERR: ${err.message}`);
  }
})();
