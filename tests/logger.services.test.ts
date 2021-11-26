import { createHash } from "../src/services/logger.services";
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