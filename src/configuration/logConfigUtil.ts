import * as fs from "fs";

export function createLogFileIfNonExistant(path: string) {
    fs.writeFile(path, '', { flag: 'a+' }, function (err) {
        if (err) throw err;
    });
}