import express = require("express");
import { createBill } from "../services/bill";

const create = (req: any, res: express.Response) => {
  createBill(req, result => {
    res.status(result.status).json(result);
  });
};

export { create };
