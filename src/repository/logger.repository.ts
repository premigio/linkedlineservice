import { Service } from "typedi";

@Service()
export class LoggerRepository {

    constructor () {

    }
    
    public getLastLog(): string {
        return "inside";
    }

}