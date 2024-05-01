const request = require("supertest");
const app = require('./test_server');

describe("POST /auth/login", () => {
  describe("given mail & password", () => {
    test("It should respond with a 201 status code", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({
          data: { email: "naruto@gmail.com", password: "siddhartha@3738" },
        });
      expect(response.statusCode).toBe(200);
    }, 150000);

    test("It should respond with a 404 status code", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({
          data: { email: "narutho@gmail.com", password: "siddhartha@3738" },
        });
      expect(response.statusCode).toBe(404);
    }, 150000);

    test("It should respond with a 400 status code", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({
          data: { email: "naruto@gmail.com", password: "somerandompassword" },
        });
      expect(response.statusCode).toBe(400);
    }, 150000);
  });
});

describe("POST /auth/register", () => {
  describe("given an already existing user", () => {
    test("It should respond with 401", async () => {
      const response = await request(app)
        .post("/auth/register")
        .send({
          email: "naruto@gmail.com",
          name: "somename",
          password: "somerandompassword",
        });
      expect(response.statusCode).toBe(401);
    }, 150000);
  });
});
