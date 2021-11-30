import {LoggerRepository} from "../src/repositories/logger.repository";
import fs from "fs";
import readline from 'readline';
import {Log} from "../src/models/logs";
import spyOn = jest.spyOn;

jest.mock('fs');
jest.mock('readline');

let mockedFs = fs as jest.Mocked<typeof fs>;
let mockedReadLine = readline as jest.Mocked<typeof readline>;

describe("Test getLastLog", () => {

    const repo = new LoggerRepository();

    it("Should return the correct value", async () => {
        const readStreamFs = {
            on: jest.fn().mockImplementation((event, handler) => {
                if (event == 'line')
                    handler("test");
                else
                    handler();
                return this;
            })
        }
        const readStreamRl = {
            on: jest.fn().mockImplementation((event, handler) => {
                if (event === 'line')
                    handler("test");
                else if (event !== 'error') //Not testing errors with opening the file as it is a mock
                    handler();
                return this;
            })
        }

        mockedFs.createReadStream.mockReturnValueOnce((readStreamFs as unknown) as fs.ReadStream);
        mockedReadLine.createInterface.mockReturnValueOnce((readStreamRl as unknown) as readline.Interface);

        const spyReadSafe = spyOn(LoggerRepository.prototype as any, "getLastLogLine");

        let result = await repo.getLastLog();

        expect(result).toEqual('test');
        expect(spyReadSafe).toBeCalled();

    });

    afterEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });
});

describe("Test writeLog", () => {

    const repo = new LoggerRepository();

    it("Should write the log on file", async () => {
        let result: string = "";
        const writeStream = {
            on: jest.fn().mockImplementation((event, handler) => {
                if (event !== 'error') //Not testing errors with opening the file as it is a mock
                    handler();
                return this;
            }),
            end: jest.fn().mockImplementation(()=>{}),
            write:jest.fn().mockImplementation((text: string)=>{
                result = text;
            }),
        }

        mockedFs.createWriteStream.mockReturnValueOnce((writeStream as unknown) as fs.WriteStream);

        const spyWriteSafe = spyOn(LoggerRepository.prototype as any, "writeSafelyLog");

        await repo.writeLog(
            new Log("0001963189690fb145d9745cb53a7bc4d0a21a20effb5153b17309ff81ec2da8",
                "fourth", 549));


        expect(result).toBe("0001963189690fb145d9745cb53a7bc4d0a21a20effb5153b17309ff81ec2da8,fourth,549\n")
        expect(spyWriteSafe).toBeCalled();
    });

    afterEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });
});