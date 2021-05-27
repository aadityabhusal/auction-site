const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

beforeAll(async () => {
  mongoose.Promise = global.Promise;
  await mongoose.connect("mongodb://localhost/AuctionSite_Test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

const Item = require("../models/itemModel");

describe("POST - /item", () => {
  describe("Any required field is missing", () => {
    test("Should respond with a status code of 500", async () => {
      const response = await request(app).post("/api/item").send({
        title: "Temp Item",
        category: "Drawing",
        bidAmount: 100,
        description: "This is Temp Item's Description",
        image: "tempitem.png",
        contact: "9876543210",
        address: "Nepal",
        auctionDate: "2021-04-30T16:04:17.104Z",
      });
      expect(response.statusCode).toBe(500);
    });
    test("Should respond with an error", async () => {
      const response = await request(app).post("/api/item").send({
        title: "Temp Item",
        category: "Drawing",
        bidAmount: 100,
        description: "This is Temp Item's Description",
        image: "tempitem.png",
        contact: "9876543210",
        address: "Nepal",
        auctionDate: "2021-04-30T16:04:17.104Z",
      });
      expect(response.body.error).toBeDefined();
    });
  });

  /*   describe("All required field provided", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app)
        .post("/api/item")
        .send({
          title: "Temp Item",
          category: "Drawing",
          bidAmount: 100,
          description: "This is Temp Item's Description",
          image: "tempitem.png",
          contact: "9876543210",
          address: "Nepal",
          auctionDate: "2021-04-30T16:04:17.104Z",
          seller: {
            _id: "60a0fa544d582721dcc0fc36",
            firstName: "Test",
            lastName: "User",
          },
        });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with a message", async () => {
      const response = await request(app)
        .post("/api/item")
        .send({
          title: "Temp Item",
          category: "Drawing",
          bidAmount: 100,
          description: "This is Temp Item's Description",
          image: "tempitem.png",
          contact: "9876543210",
          address: "Nepal",
          auctionDate: "2021-04-30T16:04:17.104Z",
          seller: {
            _id: "60a0fa544d582721dcc0fc36",
            firstName: "Test",
            lastName: "User",
          },
        });
      expect(response.body.message).toBeDefined();
    });
  }); */
});

describe("GET - /item/:itemId", () => {
  describe("Valid User Id Provided", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app).get(
        "/api/item/608c2782e6213b23d40219aa"
      );
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with an item", async () => {
      const response = await request(app).get(
        "/api/item/608c2782e6213b23d40219aa"
      );
      expect(response.body._id).toBeDefined();
    });
  });

  describe("Invalid Valid User Id Provided", () => {
    test("Should respond with a status code of 500", async () => {
      const response = await request(app).get("/api/item/123");
      expect(response.statusCode).toBe(500);
    });

    test("Should respond with an error", async () => {
      const response = await request(app).get("/api/item/123");
      expect(response.body.error).toBeDefined();
    });
  });
});

describe("PUT - /item/:itemId", () => {
  describe("All required values given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app)
        .put("/api/item/608c2782e6213b23d40219aa")
        .send({
          _id: "608c2782e6213b23d40219aa",
          address: `Address#${Math.floor(Math.random() * 10000)}`,
        });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with a status code of 200", async () => {
      const response = await request(app)
        .put("/api/item/608c2782e6213b23d40219aa")
        .send({
          _id: "608c2782e6213b23d40219aa",
          address: `Address#${Math.floor(Math.random() * 10000)}`,
        });
      expect(response.body.message).toBeDefined();
    });
  });

  describe("Any required values missing", () => {
    test("Should respond with a status code of 400", async () => {
      const response = await request(app)
        .put("/api/item/608c2782e6213b23d40219aa")
        .send({
          _id: "608c2782e6213b23d40219aa",
          address: "",
        });
      expect(response.statusCode).toBe(400);
    });

    test("Should respond with error", async () => {
      const response = await request(app)
        .put("/api/item/608c2782e6213b23d40219aa")
        .send({
          _id: "608c2782e6213b23d40219aa",
          address: "",
        });
      expect(response.body.error).toBeDefined();
    });
  });
});

describe("DELETE - /item/:itemId", () => {
  describe("Wrong Values Provided", () => {
    test("Should respond with a status code of 500", async () => {
      const response = await request(app).delete("/api/item/123").send({
        _id: "123",
      });
      expect(response.statusCode).toBe(500);
    });

    test("Should respond with error", async () => {
      const response = await request(app).delete("/api/item/123").send({
        _id: "123",
      });
      expect(response.body.error).toBeDefined();
    });
  });

  /*   describe("All required values given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app)
        .delete("/api/item/60af1dcdc561bc08d86ca6c6")
        .send({
          _id: "60af1dcdc561bc08d86ca6c6",
        });
      expect(response.statusCode).toBe(200);
    });
  }); */
});

describe("GET - /item/search/:value", () => {
  test("Should respond with a status code of 200", async () => {
    const response = await request(app).get("/api/item/search/monalisa");
    expect(response.statusCode).toBe(200);
  });

  test("Should respond with an array", async () => {
    const response = await request(app).get("/api/item/search/monalisa");
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET - /item/homepage", () => {
  test("Should respond with a status code of 200", async () => {
    const response = await request(app).get("/api/item/homepage");
    expect(response.statusCode).toBe(200);
  });

  test("Should respond with an array", async () => {
    const response = await request(app).get("/api/item/homepage");
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("PUT - /item/:itemId/placeBid", () => {
  describe("All required values given", () => {
    test("Should respond with a status code of 200", async () => {
      const response = await request(app)
        .put("/api/item/608c2782e6213b23d40219aa/placeBid")
        .send({
          _id: "60a0fa544d582721dcc0fc36",
          firstName: "Test",
          lastName: "User",
          bidAmount: 100,
        });
      expect(response.statusCode).toBe(200);
    });

    test("Should respond with a status code of 200", async () => {
      const response = await request(app)
        .put("/api/item/608c2782e6213b23d40219aa/placeBid")
        .send({
          _id: "60a0fa544d582721dcc0fc36",
          firstName: "Test",
          lastName: "User",
          bidAmount: 100,
        });
      expect(response.body._id).toBeDefined();
    });
  });

  describe("Any required values missing", () => {
    test("Should respond with a status code of 500", async () => {
      const response = await request(app)
        .put("/api/item/123/placeBid")
        .send({});
      expect(response.statusCode).toBe(500);
    });

    test("Should respond with error", async () => {
      const response = await request(app)
        .put("/api/item/123/placeBid")
        .send({});
      expect(response.body.error).toBeDefined();
    });
  });
});
