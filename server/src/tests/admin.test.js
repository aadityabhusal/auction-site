const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/AuctionSite_Test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

describe("POST - /admin/login", () => {
  describe("Email and Password given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/api/admin/login").send({
        email: "superadmin@forthebys.com",
        password: "superadmin123",
      });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with an admin token", async () => {
      const response = await request(app).post("/api/admin/login").send({
        email: "superadmin@forthebys.com",
        password: "superadmin123",
      });
      expect(response.body.adminToken).toBeDefined();
    });
  });

  describe("Email and Password missing", () => {
    test("Should respond with a status code of 400", async () => {
      const response = await request(app).post("/api/admin/login").send({});
      expect(response.statusCode).toBe(400);
    });

    test("Should respond with error", async () => {
      const response = await request(app).post("/api/admin/login").send({});
      expect(response.body.error).toBeDefined();
    });
  });
});

describe("POST - /admin/signup", () => {
  describe("Email and Password given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/api/admin/login").send({
        email: "superadmin@forthebys.com",
        password: "superadmin123",
      });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with an admin token", async () => {
      const response = await request(app).post("/api/admin/login").send({
        email: "superadmin@forthebys.com",
        password: "superadmin123",
      });
      expect(response.body.adminToken).toBeDefined();
    });
  });
});

describe("POST - /admin/auth", () => {});

describe("POST - /admin/approveWinner", () => {});

describe("PUT - /admin/:adminId", () => {});
