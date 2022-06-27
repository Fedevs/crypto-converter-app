const app = require("../src/app");
const request = require("supertest");

const setUp = (endpoint, testContext = {}) => {
  beforeEach(async () => {
    const response = await request(app).get(`${endpoint}`).send();
    Object.assign(testContext, response);
  });
  return testContext;
};

describe("GET /coins", () => {
  const response = setUp("/coins");

  test("should respond with a 200 status code", () => {
    expect(response.statusCode).toBe(200);
  });

  test("Should respond with an object", () => {
    expect(response._body).toBeInstanceOf(Object);
  });

  test("response must contain id and symbol attributes", () => {
    expect(response._body).toEqual(
      expect.objectContaining({
        response: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            symbol: expect.any(String),
          }),
        ]),
      })
    );
  });
});

describe("GET /currencies", () => {
  const response = setUp("/currencies");

  test("should respond with a 200 status code", () => {
    expect(response.statusCode).toBe(200);
  });

  test("Should respond with an object", () => {
    expect(response._body).toBeInstanceOf(Object);
  });

  test("response must be an array of strings", () => {
    expect(response._body).toEqual(
      expect.objectContaining({
        response: expect.arrayContaining([expect.any(String)]),
      })
    );
  });
});

describe("GET /convert", () => {
  test("should respond with a 404 status code", async () => {
    const response = await request(app).get("/convert").send();
    expect(response.statusCode).toBe(404);
  });

  test("Should respond with a 200 status code", async () => {
    const response = await request(app).get("/convert").query({
      ids: "polkadot",
      vs_currencies: "ars",
      amount: 4,
    });
    expect(response.statusCode).toBe(200);
  });

  test("Should respond with a number", async () => {
    const response = await request(app).get("/convert").query({
      ids: "bitcoin",
      vs_currencies: "usd",
      amount: 2,
    });
    expect(response.body.result).toEqual(expect.any(Number));
  });

  test("Should respond with an error", async () => {
    const response = await request(app).get("/convert").query({
      ids: "bitcoin",
      amount: 2,
    });
    expect(response.body.error).toBe("Mandatory parameter is missing");
  });

  test("Should respond 0", async () => {
    const response = await request(app).get("/convert").query({
      ids: "ethereum",
      vs_currencies: "clp",
    });
    expect(response.body.result).toEqual(0);
  });
});
