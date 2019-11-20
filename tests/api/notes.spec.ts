import request from "supertest";
import { config } from '../../config/config';
let note: any;

// CREATE
describe("POST notes/ - api endpoint for creating new note", () => {
  it("NOTE POST API Request", async () => {
    const result = await request(config.testApiUrl).post("/notes")
      .send({ content: 'MANGASID', attachment: null })
      .set('Content-Type', 'application/json');
    expect(result.body.status).toBe(200);
    expect(result.status).toEqual(200);
    note = result.body.data;
  });
});

// READ
describe("GET notes/{id} - api endpoint for fetching single note", () => {
  it("NOTE GET API Request", async () => {
    const result = await request(config.testApiUrl).get("/notes/" + note.noteId);
    expect(result.body.status).toBe(200);
    expect(result.status).toEqual(200);
    expect(result.body.data).toEqual(note);
  });
});

// UPDATE
describe("PUT notes/{id} - api endpoint for getting list of notes", () => {
  it("NOTE UPDATE API Request", async () => {
    const result = await request(config.testApiUrl).put("/notes/" + note.noteId)
      .send({ content: 'MANGASEED' })
      .set('Content-Type', 'application/json');
    expect(result.body.status).toBe(200);
    expect(result.status).toEqual(200);
    // read again check if update take effect
    const update_result = await request(config.testApiUrl).get("/notes/" + note.noteId);
    expect(update_result.body.status).toBe(200);
    expect(update_result.status).toEqual(200);
    expect(update_result.body.data.content).toEqual('MANGASEED');
  });
});


// DELETE
describe("DELETE notes/{id} - api endpoint for getting list of notes", () => {
  it("NOTE DELETE API Request", async () => {
    const result = await request(config.testApiUrl).delete("/notes/" + note.noteId);
    expect(result.body.status).toBe(200);
    expect(result.status).toEqual(200);
    // read again check if delete take effect
    const delete_result = await request(config.testApiUrl).get("/notes/" + note.noteId);
    expect(delete_result.body.status).toBe(200);
    expect(delete_result.body.data).toBe(undefined);
    expect(delete_result.status).toEqual(200);
  });
});

// LIST
describe("GET notes/ - api endpoint for getting list of notes", () => {
  it("NOTE GET API Request", async () => {
    const result = await request(config.testApiUrl).get("/notes");
    expect(result.body.status).toBe(200);
    expect(result.status).toEqual(200);
  });
});
