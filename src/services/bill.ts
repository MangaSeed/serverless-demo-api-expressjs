import AWS = require('aws-sdk');
import stripePackage from "stripe";
import { calculateCost } from '../libs/billing';
import { config } from "../../config/config";

import Joi, {
  string,
  number,
  object
} from "@hapi/joi";
import { ResponseDefaultType } from '../types/responseDefaultType';

// Load our secret key from SSM --> To be implemented
// const ssm = new AWS.SSM();
// const stripeSecretKeyPromise = ssm
//   .getParameter({
//     Name: config.stripeKeyName,
//     WithDecryption: true
//   })
//   .promise();

const createBill = (data: any, cb: (arg0: ResponseDefaultType) => void) => {

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
      storage: number().required(),
      source: string().required()
    }).unknown(true)
  }).unknown(true);

  const { error, value } = schema.validate(rparam);

  if (error === undefined) {

    const { storage, source } = JSON.parse(data.body);
    const amount = calculateCost(storage);
    const description = "Scratch charge";
    const stripe = new stripePackage(process.env.STRIPE_SECRET_KEY);

    const res: ResponseDefaultType = { status: 200, message: '' }; // set default value

    stripe.charges.create({
      source,
      amount,
      description,
      currency: "usd"
    }).then(result => {
      res.status = 200;
      res.message = "Successfully Billed";
      cb(res);
    }, err => {
      res.status = err.statusCode,
      res.message = err.message
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


export { createBill }