import express = require("express");
import { listNotes, createNote, readNote  } from "../services/note";


const list = (req: any, res: express.Response) => {
  listNotes(req, result => {
    res.status(result.status).json(result);
  });
};

const create = (req: any, res: express.Response) => {
  createNote(req, result => {
    res.status(result.status).json(result);
  });
};

const read = (req: any, res: express.Response) => {
  readNote(req, result => {
    res.status(result.status).json(result);
  });
};

export { list, create, read };
