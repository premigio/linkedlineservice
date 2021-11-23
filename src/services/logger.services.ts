import { Service } from "typedi";
import * as crypto from "crypto";
import { Log } from "../models/logs";
import { LoggerRepository } from "../repositories/logger.repository";
import { stringify } from "querystring";


@Service()
export class LoggerService {

    private readonly repository: LoggerRepository;

    constructor(repository: LoggerRepository) {
        this.repository = repository;
    }

    public async processLog(log: string): Promise<void> {

        var written = false;

        while (!written) {
            
            var line = await this.repository.getLastLog();
            
            var previousHash : string = line ? 
                createHash(line) : crypto.randomBytes(32).toString('hex');
            
            var hash : string = "Initial hash";
            var nonce : number = 0;
    
            var maybeLog : Log = new Log(previousHash,log, nonce);
            
            while (hash.slice(0,2) != '00') {
                maybeLog.nonce = nonce++;
                hash = createHash(maybeLog.toString());
            }
    
            written = await this.repository.writeLog(maybeLog);
        }
    }

}

function createHash(value: string): string {
    return crypto.createHash('sha256')
                 .update(value, 'utf-8')
                 .digest('hex')
                 .toString();
}
