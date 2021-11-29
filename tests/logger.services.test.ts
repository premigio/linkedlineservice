import {createHash} from "../src/services/logger.services";
import {LoggerService} from "../src/services/logger.services";
import {LoggerRepository} from "../src/repositories/logger.repository";

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

// describe("test POST log service", () => {
//
//     let logService : LoggerService;
//
//     beforeAll(() => {
//         jest.autoMockOn();
//     });
//
//     beforeEach(() => {
//         jest.clearAllMocks();
//         //const repo = jest.mock("LoggerRepository");
//         //logService = new service.LoggerService(repo);
//     });
//
//     it("should make any test", () => {
//         const log = "668f7b6f9632d02cfbdb2d7eb2b9a3c2fcb60b78454466ba4fd78f83a13561d7,first,29";
//         const expectedHash = "0003b5962e584ca5fcb92b51be672c88224d32e65e4a88ccae02c73231e30676";
//
//         //spyOn(service,'createHash').
//
//     });
//
//     afterEach(() => {
//         jest.clearAllMocks();
//     });
//
//     afterAll(() => {
//         jest.resetAllMocks();
//         jest.clearAllMocks();
//     });
//
//
// });