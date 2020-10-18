const userService = require('../../src/user_service');
const userGeteway = require('../../src/user_gateway');

it("should return 2 users resolve", async () => {
    jest.spyOn(userGeteway, "getAllUser").mockReturnValue(Promise.resolve({ code: 200, data: [{}, {}] }));
    const result = await userService.searchUser();
    expect(result.data.length).toBe(2);
});

it("should return 2 users reject", async () => {
    jest.spyOn(userGeteway, "getAllUser").mockReturnValue(Promise.reject({ code: 500, data: [] }));
    try {
        await userService.searchUser()
    } catch (error) {
        expect(error.code).toBe(500);
        expect(error.data.length).toBe(0);
    }
    // userService.searchUser().catch((error) => {
    //     expect(error.code).toBe(500);
    //     expect(error.data.length).toBe(0);
    // });
});