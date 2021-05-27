const request = require("supertest");
const mongoose = require("mongoose");

beforeAll(async () => {
  mongoose.Promise = global.Promise;
  await mongoose.connect("mongodb://localhost/AuctionSite_Test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

const app = require("../app");
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

  describe("Incorrect Password given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/api/admin/login").send({
        email: "superadmin@forthebys.com",
        password: "superadmin",
      });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with error", async () => {
      const response = await request(app).post("/api/admin/login").send({
        email: "superadmin@forthebys.com",
        password: "superadmin",
      });
      expect(response.body.error).toBeDefined();
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
      await Admin.deleteMany({ role: 2 });
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
});

describe("POST - /admin/auth", () => {
  describe("Admin token given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).post("/api/admin/auth").send({
        adminToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEwODkyOGIxZmMzMjJjMTg3ZTg1MTIiLCJyb2xlIjoxLCJpYXQiOjE2MjIwODkxMjR9.5g13DwQxSYA9cKAY-ml69HEVp8Ez99ehKkP8Vpszkxo",
      });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with user details", async () => {
      const response = await request(app).post("/api/admin/auth").send({
        adminToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEwODkyOGIxZmMzMjJjMTg3ZTg1MTIiLCJyb2xlIjoxLCJpYXQiOjE2MjIwODkxMjR9.5g13DwQxSYA9cKAY-ml69HEVp8Ez99ehKkP8Vpszkxo",
      });
      expect(response.body._id).toBeDefined();
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
});

describe("GET - /admin", () => {
  describe("GET - /admin/admins", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).get("/api/admin/admins/");
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with an array", async () => {
      const response = await request(app).get("/api/admin/admins/");
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
  describe("GET - /admin/users", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).get("/api/admin/users/");
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with an array", async () => {
      const response = await request(app).get("/api/admin/users/");
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
  describe("GET - /admin/items", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).get("/api/admin/items/");
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with an array", async () => {
      const response = await request(app).get("/api/admin/items/");
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});

describe("PUT - /admin/:adminId", () => {
  describe("All required values given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app)
        .put("/api/admin/60a08928b1fc322c187e8512")
        .send({
          _id: "60a08928b1fc322c187e8512",
          address: `Address#${Math.floor(Math.random() * 10000)}`,
        });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with a status code of 200", async () => {
      const response = await request(app)
        .put("/api/admin/60a08928b1fc322c187e8512")
        .send({
          _id: "60a08928b1fc322c187e8512",
          address: `Address#${Math.floor(Math.random() * 10000)}`,
        });
      expect(response.body._id).toBeDefined();
    });
  });

  describe("Any required values missing", () => {
    test("Should respond with a status code of 400", async () => {
      const response = await request(app)
        .put("/api/admin/60a08928b1fc322c187e8512")
        .send({
          _id: "60a08928b1fc322c187e8512",
          address: "",
        });
      expect(response.statusCode).toBe(400);
    });

    test("Should respond with error", async () => {
      const response = await request(app)
        .put("/api/admin/60a08928b1fc322c187e8512")
        .send({
          _id: "60a08928b1fc322c187e8512",
          address: "",
        });
      expect(response.body.error).toBeDefined();
    });
  });
});

describe("POST - /admin/approveWinner", () => {
  describe("All required values given", () => {
    const data = {
      item: {
        image: "testitem.jpg",
        title: "Test Item",
        _id: "608c2782e6213b23d40219aa",
      },
      winner: {
        bidAmount: 100,
        firstName: "Test",
        lastName: "User",
        _id: "60a0fa544d582721dcc0fc36",
      },
      approved: 1,
    };

    test("Should respond with a status code of 200", async () => {
      const response = await request(app)
        .put("/api/admin/approveWinner")
        .send(data);
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with a status code of 200", async () => {
      const response = await request(app)
        .put("/api/admin/approveWinner")
        .send(data);
      expect(response.body.message).toBeDefined();
    });
  });

  describe("Any required values missing", () => {
    const data = {
      item: {
        image: "testitem.jpg",
        title: "Test Item",
        _id: "",
      },
      winner: {
        bidAmount: 100,
        firstName: "Test",
        lastName: "User",
        _id: "60a0fa544d582721dcc0fc36",
      },
      approved: 1,
    };
    test("Should respond with a status code of 500", async () => {
      const response = await request(app)
        .put("/api/admin/approveWinner")
        .send(data);
      expect(response.statusCode).toBe(500);
    });

    test("Should respond with error", async () => {
      const response = await request(app)
        .put("/api/admin/approveWinner")
        .send(data);
      expect(response.body.error).toBeDefined();
    });
  });
});

describe("DELETE - /admin/:adminId", () => {
  describe("Wrong Values Provided", () => {
    test("Should respond with a status code of 500", async () => {
      const response = await request(app).delete("/api/admin/123").send({
        _id: "123",
      });
      expect(response.statusCode).toBe(500);
    });

    test("Should respond with error", async () => {
      const response = await request(app).delete("/api/admin/123").send({
        _id: "123",
      });
      expect(response.body.error).toBeDefined();
    });
  });

  describe("All required values given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app)
        .delete("/api/admin/60af1dcdc561bc08d86ca6c6")
        .send({
          _id: "60af1dcdc561bc08d86ca6c6",
        });
      expect(response.statusCode).toBe(200);
    });
  });
});
