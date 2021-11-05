const request = require("supertest");
const app = require("../app.js");

test("not found for site 404", async function () {
  const resp = await request(app).get("/no-such-path");
  expect(resp.statusCode).toEqual(404);
});

test("200 response from get", async function () {
  const resp = await request(app).get("/strings");
  expect(resp.statusCode).toEqual(200);
});

test("Get all returns an array", async function () {
  const resp = await request(app).get("/strings");
  expect(Array.isArray(resp.body)).toEqual(true);
});