const ui = require("./src/user-interface");
const database = require("./src/single-linked-list");

(function ({ ui, database }) {
  try {
    database.loadList();
    ui.run();
  } catch (err) {
    console.error(`> ERR: ${err.message}`);
  }
})({ ui, database });
