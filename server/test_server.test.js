const supertest = require("supertest");
const app = require('./server');
const User = require("./models/User");
const users = require("./test_server.test.data");
const mongoose = require("mongoose");
const request = supertest(app);

let connection;
let db;

beforeAll(async () => {
  await mongoose.connect("mongodb+srv://lancify:1CeOEWH8wfnKgWVU@cluster0.hripjgl.mongodb.net/lancify-testing?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

beforeEach(async () => {
  for (const user of users) {
    const response = await request
      .post("/auth/register")
      .send({
        name: user.username,
        email: user.email,
        password: user.password
      });
  }
})

afterEach(async () => {
  await User.deleteMany()
})

afterAll(async () => {
  await mongoose.connection.db.dropCollection('users')
  await mongoose.connection.close()
})

describe("POST /auth/login", () => {
  describe("given mail & password", () => {
    test("It should respond with a 200 status code", async () => {
      const response = await request
        .post("/auth/login")
        .send({
          data: {
            email: "author1@gmail.com",
            password: "pwd2",
          }
        });
      expect(response.statusCode).toBe(200);
    });

    test("It should respond with a 404 status code", async () => {
      const response = await request
        .post("/auth/login")
        .send({
          data: {
            email: "author9@gmail.com",
            password: "pwd2",
          }
        });
      expect(response.statusCode).toBe(404);
    });

    test("It should respond with a 400 status code", async () => {
      const response = await request
        .post("/auth/login")
        .send({
          data: {
            email: "author1@gmail.com",
            password: "pwdsadf",
          }
        });
      expect(response.statusCode).toBe(400);
    });
  });
});

describe("POST /auth/register", () => {
  describe("given an already existing user", () => {
    test("It should respond with 401", async () => {
      const response = await request
        .post("/auth/register")
        .send({
          email: "author1@gmail.com",
          name: "somename",
          password: "somerandompassword",
        });
      expect(response.statusCode).toBe(401);
    });
  });

  describe("given an new user", () => {
    test("It should respond with 201", async () => {
      const response = await request
        .post("/auth/register")
        .send({
          email: "author4@gmail.com",
          name: "quote5",
          password: "somerandompassword",
        });
      expect(response.statusCode).toBe(201);
    });
  });
});
