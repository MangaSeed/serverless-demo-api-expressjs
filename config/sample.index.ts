import { configType } from "../src/types/configType";

const config = {
  development: {
    stripeSecretKey: "",
    stripeKeyName: "",
    dynamoDbLocalUrl: "http://localhost:8000",
    testApiUrl: "http://localhost:3000",
    isOffline: false
  },
  staging : {
    stripeSecretKey: "",
    stripeKeyName: "",
    isOffline: false
  },
  production : {
    stripeSecretKey: "",
    stripeKeyName: "",
    isOffline: false
  }
}

const environment = process.env.ENVIRONMENT;
let finalconfig:configType;
switch(environment) {
  case 'development':
    finalconfig = config.development;
  break
  case 'staging':
    finalconfig = config.staging;
  break;
  case 'production':
    finalconfig = config.production;
  break;
  default :
    finalconfig = config.development;
  break;
}

export default finalconfig;