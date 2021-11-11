import { helloWorld } from "../src/helloworld";
describe("test add function", () => {
    it("should return true", () => {
        expect(helloWorld()).toBe(true);
    });
});