import request from "supertest";
import { config } from '../../config';

// CREATE
describe("POST billing/ - api endpoint for creating billing transaction", () => {
  it("NOTE POST API Request", async () => {
    const result = await request(config.testApiUrl).post("/billing")
      .send({
        "storage" : 200000,
        "source" : "tok_visa"
      })
      .set('Content-Type', 'application/json');
    expect(result.body.status).toBe(200);
    expect(result.status).toEqual(200);
  });
});

