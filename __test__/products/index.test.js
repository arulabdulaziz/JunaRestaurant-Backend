const request = require("supertest");
const app = require("../../app");
const db = require("../../app/models");
const Product = db.product;

describe(`get product all`, () => {
  it("product showed on an array", (done) => {
    request(app)
      .get("/product")
      .end(async (err, res) => {
        const product = await Product.find();
        if (err) done(err);
        else {
          const { status, body } = res;
          expect(status).toEqual(200);
          expect(body).toHaveProperty("data", product);
          done();
        }
      });
  });
});
