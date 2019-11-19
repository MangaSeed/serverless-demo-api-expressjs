import request from "supertest"; 

describe("GET notes/ - api endpoint for getting list of notes", () => {
  it("NOTE GET API Request", async () => {
    const result = await request("http://localhost:3000").get("/notes");
    expect(result.body.status).toBe(200);
    expect(result.status).toEqual(200);
  });
});