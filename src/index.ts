import serverless = require('serverless-http');
import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');

import dotenv = require('dotenv');
dotenv.config();

const app: express.Application = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* ROUTES */
import { notesRouter } from './routes/notes';
import { billsRouter } from './routes/bills';

app.use('/notes', notesRouter);
app.use('/billing', billsRouter);

module.exports.handler = serverless(app);