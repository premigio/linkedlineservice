import { Service } from "typedi";
import { Log } from "../models/logs";
import * as fs from "fs";
import readline from 'readline';
import {logger} from "../configuration/app";


@Service()
export class LoggerRepository {

    private readonly filepath : string = "./logs.txt";
    private mutex : boolean;

    constructor () {
        this.mutex = true;
    }
    
    public async getLastLog(): Promise<string> {
        if (this.mutex) {
            this.mutex = false;
            let line = await this.getLastLogLine();
            this.mutex = true;
            return line;
        }
        return "";
    }
    private async getLastLogLine() : Promise<string> {
        return new Promise(async (resolve, reject) => {
            let stream = fs.createReadStream(this.filepath);

            let file = readline.createInterface({
                input: stream,
                output: process.stdout,
                terminal: false
            });

            let lastLine: string = '';

            file.on('line',(line) => {
                lastLine = line?.length > 0 ? line : lastLine;
            });

            file.on('error', () => {
                logger.error("There were problems opening the file when reading");
                reject("There were problems opening the file");
            });

            file.on('close', function () {
                logger.info("log read successfully");
                resolve(lastLine);
            });
        });
        
    }

    public async writeLog(maybeLog: Log): Promise<boolean> {
        if (this.mutex) {
            this.mutex = false;
            await this.writeSafelyLog(maybeLog)
            this.mutex = true;
            return true;
        }
        return false;
    }

    private async writeSafelyLog(maybeLog: Log) : Promise<void> {
        return new Promise((resolve, reject) => {
            let stream = fs.createWriteStream(this.filepath, {flags: 'a'});

            stream.write(maybeLog.toString() + '\n');

            stream.end();
            
            stream.on('error', () => {
                logger.error("There were problems opening the file when writing");
                reject("There were problems opening the file");
            });

            stream.on('close', function () {
                logger.info("log written successfully");
                resolve();
            });
        });
    }
}
