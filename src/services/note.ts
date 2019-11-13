import AWS = require('aws-sdk');
import uuid from 'uuid';
import Joi, {
  string,
  object
} from "@hapi/joi";
import { ResponseDefaultType } from '../types/responseDefaultType';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const listNotes = (data: any, cb: (arg0: ResponseDefaultType) => void) => {

  // required param
  const rparam = {
    requestContext: data.requestContext
  }

  const schema = object({
    requestContext: object({
      identity: object({
        cognitoIdentityId: string().required()
      }).unknown(true)
    }).unknown(true)
  }).unknown(true);

  const { error, value } = schema.validate(rparam);

  if (error === undefined) {

    const queryParams = {
      TableName: process.env.NOTES_TABLE,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": data.requestContext.identity.cognitoIdentityId
      }
    }

    const res: ResponseDefaultType = { status: 200, message: '' }; // set default value
    dynamoDb.query(queryParams, (err, result) => {

      if (err) {
        res.status = err.statusCode,
          res.message = err.message
      } else {
        res.status = 200;
        res.data = result.Items;
        res.message = "Successfully fetch note list";
      }

      cb(res);

    });
  } else {
    const response: ResponseDefaultType = {
      status: 400,
      message: "Invalid parameters"
    }
    console.log(error.details); // logs
    cb(response);
  }
}

const createNote = (data: any, cb: (arg0: ResponseDefaultType) => void) => {

  // required param
  const rparam = {
    requestContext: data.requestContext,
    body: JSON.parse(data.body)
  }

  const schema = object({
    requestContext: object({
      identity: object({
        cognitoIdentityId: string().required()
      }).unknown(true)
    }).unknown(true),
    body: object({
      content: string().required()
    }).unknown(true)
  }).unknown(true);

  const { error, value } = schema.validate(rparam);

  if (error === undefined) {

    const { content, attachment } = JSON.parse(data.body);

    const queryParams = {
      TableName: process.env.NOTES_TABLE,
      Item: {
        userId: data.requestContext.identity.cognitoIdentityId,
        noteId: uuid.v1(),
        content,
        attachment,
        createdAt: Date.now()
      }
    }

    const res: ResponseDefaultType = { status: 200, message: '' }; // set default value
    dynamoDb.put(queryParams, (err, _result) => {

      if (err) {
        res.status = err.statusCode,
        res.message = err.message
      } else {
        res.status = 200;
        res.data = queryParams.Item;
        res.message = "Successfully created a new note";
      }

      cb(res);

    });
  } else {
    const response: ResponseDefaultType = {
      status: 400,
      message: "Invalid parameters"
    }
    console.log(error.details); // logs
    cb(response);
  }
}

export { createNote, listNotes }