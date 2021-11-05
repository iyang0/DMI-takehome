const { beforeAll } = require("jest-circus");
const request = require("supertest");
const app = require("../app.js");
const stringsPath = "../data/testData.json";
const stringsJson = require(stringsPath);

describe( "express routes tests", function(){

  beforeAll(() => {
    process.env.NODE_ENV="test";
  })

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
  
  test("Post to strings all works", async function () {
    const resp = await request(app)
      .post("/strings")
      .send({
        "string":"test"
      });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual(expect.arrayContaining(["test", ...stringsJson.strings]));
    
  });
});