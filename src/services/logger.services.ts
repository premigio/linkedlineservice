import { Service } from "typedi";
import { LoggerRepository } from "../repository/logger.repository";

@Service()
export class LoggerService {

    private readonly repository: LoggerRepository;

    constructor(repository: LoggerRepository) {
        this.repository = repository;
    }

    public processLog(log: string): void {
        console.log(2);
        var b = this.repository.getLastLog();
        console.log(b);
    }

}