import { Service } from "typedi";
import * as crypto from "crypto";
import { Log } from "../models/logs";
import { LoggerRepository } from "../repositories/logger.repository";

@Service()
export class LoggerService {

    private readonly repository: LoggerRepository;
    private previousHash: string;

    constructor(repository: LoggerRepository) {
        this.repository = repository;
        this.previousHash = "";
    }

    public async processLog(log: string): Promise<void> {

        let written = false;

        while (true) {
            console.info(log + ' => service started')
            let line = await this.repository.getLastLog();

            this.previousHash = line ?
                createHash(line) : crypto.randomBytes(32).toString('hex');

            let hash: string = "Initial hash";
            let nonce: number = 0;

            const maybeLog: Log = new Log(this.previousHash, log, nonce);

            while (hash.slice(0,2) != '00') {
                maybeLog.nonce = nonce++;
                hash = createHash(maybeLog.toString());
            }
            if (this.previousHash === maybeLog.prevHash) {
                this.previousHash = hash;
                written = await this.repository.writeLog(maybeLog);
                if (written ) break;
                await changeEventLoop();
            }
        }
    }

}

function createHash(value: string): string {
    return crypto.createHash('sha256')
                 .update(value, 'utf-8')
                 .digest('hex')
                 .toString();
}

function changeEventLoop() {
    return new Promise((resolve) => {
        setTimeout(resolve, 1);
    });
}