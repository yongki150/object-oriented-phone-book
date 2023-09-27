import fs from "node:fs";
import readlinePromises from "node:readline/promises";
import { faker } from "@faker-js/faker";
import ui from "./src/user-interface";

(function () {
  try {
    ui.run({ faker, fs, readlinePromises });
  } catch (err) {
    console.error(`> ERR: ${err.message}`);
  }
})();
