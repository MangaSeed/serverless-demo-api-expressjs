import express = require("express");
import AWS = require("aws-sdk");
import uuid from "uuid";
import { createNote, listNotes } from "../services/note";
const dynamoDb = new AWS.DynamoDB.DocumentClient();

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

export { create, list };
