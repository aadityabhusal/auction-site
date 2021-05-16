const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/AuctionSite_Test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const Admin = require("../models/adminModel");

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
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/api/admin/login").send({});
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with error", async () => {
      const response = await request(app).post("/api/admin/login").send({});
      expect(response.body.error).toBeDefined();
    });
  });
});

describe("POST - /admin/signup", () => {
  describe("All required values given", () => {
    beforeAll(async () => {
      await Admin.remove({ role: 2 });
    });
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/api/admin/signup").send({
        firstName: "Test",
        lastName: "Admin",
        email: "testadmin@forthebys.com",
        password: "testadmin123",
        contact: "9876543210",
        address: "Nepal",
        role: 2,
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Email already exists", () => {
    test("Should respond with a status code of 500", async () => {
      const response = await request(app).post("/api/admin/signup").send({
        firstName: "Super",
        lastName: "Admin",
        email: "superadmin@forthebys.com",
        password: "superadmin123",
        contact: "9876543210",
        address: "Nepal",
        role: 2,
      });
      expect(response.statusCode).toBe(500);
    });
  });

  describe("Any required field is missing", () => {
    test("Should respond with a status code of 500", async () => {
      const response = await request(app).post("/api/admin/signup").send({
        firstName: "Super",
        lastName: "Admin",
        role: 2,
      });
      expect(response.statusCode).toBe(500);
    });

    test("Should respond with error", async () => {
      const response = await request(app).post("/api/admin/signup").send({
        firstName: "Super",
        lastName: "Admin",
        role: 2,
      });
      expect(response.body.error).toBeDefined();
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});

describe("POST - /admin/auth", () => {
  describe("Admin token given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/api/admin/auth").send({
        adminToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDg3ODc4YzNiNWYyMDE0MWNhMTI5YmMiLCJyb2xlIjoxLCJpYXQiOjE2MjEwODE4ODd9.XNnyZfa42nOnaI_z5YrnJ2TItvpVQE2CiWhr3LLUqrA",
      });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with user details", async () => {
      const response = await request(app).post("/api/admin/auth").send({
        adminToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDg3ODc4YzNiNWYyMDE0MWNhMTI5YmMiLCJyb2xlIjoxLCJpYXQiOjE2MjEwODE4ODd9.XNnyZfa42nOnaI_z5YrnJ2TItvpVQE2CiWhr3LLUqrA",
      });
      expect(response.body).toBeDefined();
    });
  });

  describe("Admin token missing", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/api/admin/auth").send({});
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with error", async () => {
      const response = await request(app).post("/api/admin/auth").send({});
      expect(response.body.error).toBeDefined();
    });
  });

  describe("Admin token invalid", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/api/admin/auth").send({
        adminToken: "12345",
      });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with error", async () => {
      const response = await request(app).post("/api/admin/auth").send({
        adminToken: "12345",
      });
      expect(response.body.error).toBeDefined();
    });
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
});

describe("PUT - /admin/:adminId", () => {
  describe("All required values given", () => {
    test("Should respond with a status code of 200", async () => {
      const _id = "60a08928b1fc322c187e8512";
      const address = `Address#${Math.floor(Math.random() * 10000)}`;
      const response = await request(app)
        .put("/api/admin/60a08928b1fc322c187e8512")
        .send({
          _id,
          address,
        });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with a status code of 200", async () => {
      const _id = "60a08928b1fc322c187e8512";
      const address = `Address#${Math.floor(Math.random() * 10000)}`;
      const response = await request(app)
        .put("/api/admin/60a08928b1fc322c187e8512")
        .send({
          _id,
          address,
        });
      expect(response.body._id).toBeDefined();
    });
  });

  describe("Any required values missing", () => {
    test("Should respond with a status code of 400", async () => {
      const _id = "60a08928b1fc322c187e8512";
      const address = "";
      const response = await request(app)
        .put("/api/admin/60a08928b1fc322c187e8512")
        .send({
          _id,
          address,
        });
      expect(response.statusCode).toBe(400);
    });

    test("Should respond with error", async () => {
      const _id = "60a08928b1fc322c187e8512";
      const address = "";
      const response = await request(app)
        .put("/api/admin/60a08928b1fc322c187e8512")
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

/* 
describe("POST - /admin/approveWinner", () => {
  describe("All required values given", () => {
    const data = {
      item: {},
      winner: {},
      approvedValue: 1,
    };
    test("Should respond with a status code of 200", async () => {
      const _id = "60a08928b1fc322c187e8512";
      const address = `Address#${Math.floor(Math.random() * 10000)}`;
      const response = await request(app).put("/api/admin/approveWinner").send({
        _id,
        address,
      });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with a status code of 200", async () => {
      const _id = "60a08928b1fc322c187e8512";
      const address = `Address#${Math.floor(Math.random() * 10000)}`;
      const response = await request(app).put("/api/admin/approveWinner").send({
        _id,
        address,
      });
      expect(response.message).toBeDefined();
    });
  });

  describe("Any required values missing", () => {
    const data = {
      item: {},
      winner: {},
      approvedValue: 1,
    };
    test("Should respond with a status code of 400", async () => {
      const _id = "60a08928b1fc322c187e8512";
      const address = "";
      const response = await request(app).put("/api/admin/approveWinner").send({
        _id,
        address,
      });
      expect(response.statusCode).toBe(400);
    });

    test("Should respond with error", async () => {
      const response = await request(app).put("/api/admin/approveWinner").send({
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
*/
