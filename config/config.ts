import { configType } from "../src/types/configType";

const config = {
  development: {
    stripeSecretKey: "sk_test_3dtYpQYtleuhyaGqdwP92yFt00MiouEYgt",
    stripeKeyName: ""
  },
  staging : {
    stripeSecretKey: "",
    stripeKeyName: ""
  },
  production : {
    stripeSecretKey: "",
    stripeKeyName: ""
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

export { finalconfig as config };