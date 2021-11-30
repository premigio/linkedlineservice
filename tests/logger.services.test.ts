import {createHash} from "../src/services/logger.services";
import {LoggerService} from "../src/services/logger.services";
import {LoggerRepository} from "../src/repositories/logger.repository";

jest.mock('../src/configuration/app');
jest.mock('../src/repositories/logger.repository');

let mockedRepo = LoggerRepository as jest.Mocked<typeof LoggerRepository>;

describe("test hash function", () => {
    it("should create the correct hash", () => {
        expect(createHash("668f7b6f9632d02cfbdb2d7eb2b9a3c2fcb60b78454466ba4fd78f83a13561d7,first,29"))
            .toEqual("0003b5962e584ca5fcb92b51be672c88224d32e65e4a88ccae02c73231e30676");
    });
    it("should create the wrong hash", () => {
        expect(createHash("668f7b6f9632d02cfbdb2d7eb2b9a3c2fcb60b78454466ba4fd78f83a13561d7,first,29"))
            .not.toEqual("0082b1a5f9f3583041902d04d86e28f793cc45bbc674ca337616991e7fe68de8");
    });
});

describe("test POST log service", () => {

    let logService : LoggerService;

    // Test based on the following log test case:
    // 668f7b6f9632d02cfbdb2d7eb2b9a3c2fcb60b78454466ba4fd78f83a13561d7,first,29
    // 0003b5962e584ca5fcb92b51be672c88224d32e65e4a88ccae02c73231e30676,fourth,42
    // 0082b1a5f9f3583041902d04d86e28f793cc45bbc674ca337616991e7fe68de8,sixth,228
    it("should return the correct hash", async () => {
        const log = "668f7b6f9632d02cfbdb2d7eb2b9a3c2fcb60b78454466ba4fd78f83a13561d7,first,29";
        const inputLog = "fourth";
        const expectedHash = "0082b1a5f9f3583041902d04d86e28f793cc45bbc674ca337616991e7fe68de8";

        (mockedRepo.prototype.getLastLog as jest.Mock)
            .mockReturnValue(log);
        (mockedRepo.prototype.writeLog as jest.Mock)
            .mockReturnValue(true);

        logService = new LoggerService(mockedRepo.prototype);

        let result = await logService.processLog(inputLog);

        expect(result).toEqual(expectedHash);
    });

    afterEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });
});