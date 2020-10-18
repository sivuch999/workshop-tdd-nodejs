const nock = require("nock");
const userGeteway2 = require("../../src/user_gateway");

describe("call service", () => {
    it("check response from /users", async () => {
        // Mock server
        nock("https://jsonplaceholder.cypress.io")
            .defaultReplyHeaders({ "access-control-allow-origin": "*" })
            .get("/users")
            .reply(200, [{}, {}]);
        
        // Verify
        const response = await userGeteway2.getAllUser();
        expect(response.data.length).toEqual(2)
    });
});

describe("call service", () => {
    it("check response from /users", async () => {
        // Mock server
        nock("https://jsonplaceholder.cypress.io")
            .defaultReplyHeaders({ "access-control-allow-origin": "*" })
            .get("/users")
            .reply(500, []);
        
        // Verify
        const response = await userGeteway2.getAllUser();
        expect(response.code).toEqual(500)
        expect(response.data.length).toEqual(0);
    });
});