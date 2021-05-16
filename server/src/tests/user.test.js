const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/AuctionSite_Test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const User = require("../models/userModel");

describe("POST - /user/login", () => {
  describe("Email and Password given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/api/user/login").send({
        email: "testuser@forthebys.com",
        password: "testuser123",
      });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with an user token", async () => {
      const response = await request(app).post("/api/user/login").send({
        email: "testuser@forthebys.com",
        password: "testuser123",
      });
      expect(response.body.userToken).toBeDefined();
    });
  });

  describe("Email and Password missing", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/api/user/login").send({});
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with error", async () => {
      const response = await request(app).post("/api/user/login").send({});
      expect(response.body.error).toBeDefined();
    });
  });
});

describe("POST - /user/signup", () => {
  describe("All required values given", () => {
    beforeAll(async () => {
      await User.remove({ status: 0 });
    });
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/api/user/signup").send({
        firstName: "Temp",
        lastName: "User",
        email: "tempuser@forthebys.com",
        password: "tempuser123",
        contact: "9876543210",
        address: "Nepal",
        role: 2,
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Email already exists", () => {
    test("Should respond with a status code of 500", async () => {
      const response = await request(app).post("/api/user/signup").send({
        firstName: "Temp",
        lastName: "User",
        email: "tempuser@forthebys.com",
        password: "tempuser123",
        contact: "9876543210",
        address: "Nepal",
        role: 2,
      });
      expect(response.statusCode).toBe(500);
    });
  });

  describe("Any required field is missing", () => {
    test("Should respond with a status code of 500", async () => {
      const response = await request(app).post("/api/user/signup").send({
        firstName: "Temp",
        lastName: "User",
        role: 2,
      });
      expect(response.statusCode).toBe(500);
    });

    test("Should respond with error", async () => {
      const response = await request(app).post("/api/user/signup").send({
        firstName: "Temp",
        lastName: "User",
        role: 2,
      });
      expect(response.body.error).toBeDefined();
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});

describe("POST - /user/auth", () => {
  describe("User token given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/api/user/auth").send({
        userToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEwZmE1NDRkNTgyNzIxZGNjMGZjMzYiLCJpYXQiOjE2MjExNjM3NDF9.qKVKxO2AbrpnTpctMNe_7ITU-ECPgNo_KycEkKrSeYI",
      });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with user details", async () => {
      const response = await request(app).post("/api/user/auth").send({
        userToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEwZmE1NDRkNTgyNzIxZGNjMGZjMzYiLCJpYXQiOjE2MjExNjM3NDF9.qKVKxO2AbrpnTpctMNe_7ITU-ECPgNo_KycEkKrSeYI",
      });
      expect(response.body).toBeDefined();
    });
  });

  describe("User token missing", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/api/user/auth").send({});
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with error", async () => {
      const response = await request(app).post("/api/user/auth").send({});
      expect(response.body.error).toBeDefined();
    });
  });

  describe("User token invalid", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/api/user/auth").send({
        userToken: "12345",
      });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with error", async () => {
      const response = await request(app).post("/api/user/auth").send({
        userToken: "12345",
      });
      expect(response.body.error).toBeDefined();
    });
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
});

describe("PUT - /user/:userId", () => {
  describe("All required values given", () => {
    test("Should respond with a status code of 200", async () => {
      const _id = "60a0fa544d582721dcc0fc36";
      const address = `Address#${Math.floor(Math.random() * 10000)}`;
      const response = await request(app)
        .put("/api/user/60a0fa544d582721dcc0fc36")
        .send({
          _id,
          address,
        });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with a status code of 200", async () => {
      const _id = "60a0fa544d582721dcc0fc36";
      const address = `Address#${Math.floor(Math.random() * 10000)}`;
      const response = await request(app)
        .put("/api/user/60a0fa544d582721dcc0fc36")
        .send({
          _id,
          address,
        });
      expect(response.body._id).toBeDefined();
    });
  });

  describe("Any required values missing", () => {
    test("Should respond with a status code of 400", async () => {
      const _id = "60a0fa544d582721dcc0fc36";
      const address = "";
      const response = await request(app)
        .put("/api/user/60a0fa544d582721dcc0fc36")
        .send({
          _id,
          address,
        });
      expect(response.statusCode).toBe(400);
    });

    test("Should respond with error", async () => {
      const _id = "60a0fa544d582721dcc0fc36";
      const address = "";
      const response = await request(app)
        .put("/api/user/60a0fa544d582721dcc0fc36")
        .send({
          _id,
          address,
        });
      expect(response.body.error).toBeDefined();
    });
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
