import * as fs from "fs";
import {logger} from "./app";

export function createLogFileIfNonExistant(path: string) {
    fs.writeFile(path, '', {flag: 'a+'}, function (err) {
        if (err) {
            logger.error("Could not create final PoW log file. Check for writing permissions");
            throw err;
        }
    });
}