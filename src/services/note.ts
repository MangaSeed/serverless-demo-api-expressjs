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
    body: data.body
  }
  console.log("BODY: ", data.body);

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

    const { content, attachment } = data.body;

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

const readNote = (data: any, cb: (arg0: ResponseDefaultType) => void) => {

  // required param
  const rparam = {
    requestContext: data.requestContext,
    params: data.params
  }

  const schema = object({
    requestContext: object({
      identity: object({
        cognitoIdentityId: string().required()
      }).unknown(true)
    }).unknown(true),
    params: object({
      id : string().required().trim()
    }).unknown(true)
  }).unknown(true);

  const { error, value } = schema.validate(rparam);

  if (error === undefined) {

    const queryParams = {
      TableName: process.env.NOTES_TABLE,
      Key: {
        userId: data.requestContext.identity.cognitoIdentityId,
        noteId: data.params.id
      }
    }

    const res: ResponseDefaultType = { status: 200, message: '' }; // set default value
    dynamoDb.get(queryParams, (err, result) => {

      if (err) {
        res.status = err.statusCode,
        res.message = err.message
      } else {
        res.status = 200;
        res.data = result.Item;
        res.message = "Successfully fetch a note";
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

const updateNote = (data: any, cb: (arg0: ResponseDefaultType) => void) => {

  // required param
  const rparam = {
    requestContext: data.requestContext,
    body: data.body
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

    const { content, attachment } = data.body;

    const queryParams = {
      TableName: process.env.NOTES_TABLE,
      Key: {
        userId: data.requestContext.identity.cognitoIdentityId,
        noteId: data.params.id
      },
      UpdateExpression: "SET content = :content, attachment = :attachment",
      ExpressionAttributeValues: {
        ":attachment": attachment || null,
        ":content": content || null
      },
      ReturnValues: "ALL_NEW"
    }

    const res: ResponseDefaultType = { status: 200, message: '' }; // set default value
    dynamoDb.update(queryParams, (err, _result) => {

      if (err) {
        res.status = err.statusCode,
        res.message = err.message
      } else {
        res.status = 200;
        res.data = _result.Attributes;
        res.message = "Successfully update the note";
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

const destroyNote = (data: any, cb: (arg0: ResponseDefaultType) => void) => {

  // required param
  const rparam = {
    requestContext: data.requestContext,
    params: data.params
  }

  const schema = object({
    requestContext: object({
      identity: object({
        cognitoIdentityId: string().required()
      }).unknown(true)
    }).unknown(true),
    params: object({
      id : string().required().trim()
    }).unknown(true)
  }).unknown(true);

  const { error, value } = schema.validate(rparam);

  if (error === undefined) {

    const deleteParams = {
      TableName: process.env.NOTES_TABLE,
      Key: {
        userId: data.requestContext.identity.cognitoIdentityId,
        noteId: data.params.id
      }
    }

    const res: ResponseDefaultType = { status: 200, message: '' }; // set default value
    dynamoDb.delete(deleteParams, (err, _result) => {

      if (err) {
        res.status = err.statusCode,
        res.message = err.message
      } else {
        res.status = 200;
        res.data = _result.Attributes;
        res.message = "Successfully deleted a note";
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

export { listNotes, createNote, readNote, updateNote, destroyNote }