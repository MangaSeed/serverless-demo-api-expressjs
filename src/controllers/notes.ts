import express = require("express");
import { listNotes, createNote, readNote, updateNote, destroyNote } from "../services/note";


const list = (req: any, res: express.Response) => {
  listNotes(req, result => {
    res.status(result.status).json(result).end();
  });
};

const create = (req: any, res: express.Response) => {
  console.log("from controller: ", req.body);
  createNote(req, result => {
    res.status(result.status).json(result);
  });
};

const read = (req: any, res: express.Response) => {
  readNote(req, result => {
    res.status(result.status).json(result);
  });
};

const update = (req: any, res: express.Response) => {
  updateNote(req, result => {
    res.status(result.status).json(result);
  });
};

const destroy = (req: any, res: express.Response) => {
  destroyNote(req, result => {
    res.status(result.status).json(result);
  });
};

export { list, create, read, update, destroy };
