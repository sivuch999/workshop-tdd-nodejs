const nock2 = require("nock");
const request = require("supertest");
const app = require("../../src/app");
const userService2 = require('../../src/user_service');

it("should return 200 and 2 users", async () => {
    // Mock server
    await nock2("https://jsonplaceholder.cypress.io")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .get("/users")
        .reply(200, [{}, {}]);

    await request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            // if (err) throw err;
            expect(response.body.length).toBe(2);
        });
});

it("should return 404", async () => {
    // Mock server
    await nock2("https://jsonplaceholder.cypress.io")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .get("/users")
        .reply(404, { error: "User not found" });

    await request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response) => {
            // if (err) throw err;
            expect(response.body.error).toBe("User not found");
        });
});

it("should return 500", async (done) => {
    // Mock server
    jest.spyOn(userService2, "searchUser").mockRejectedValue(({ code: 500, data: [] }));

    request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(500)
        .end((error , response) => {
            if (error) throw error;
            done();
        });
});