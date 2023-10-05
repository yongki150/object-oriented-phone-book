import fs from "node:fs";
import readline from "node:readline/promises";
import { faker } from "@faker-js/faker";
import ui from "./src/user-interface";

(function () {
  try {
    ui.run({ faker, fs, readline });
  } catch (err) {
    console.error(`> ERR: ${(err as Error).message}`);
  }
})();
