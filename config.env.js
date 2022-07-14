import dotenv from 'dotenv'

const envFound = dotenv.config();
    if (envFound.error) {
      throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const env = {     
    apiKey: process.env.APIKEY,
    messageSenderId: process.env.MESSAGESENDERID,
    projectId: process.env.PROJECTID,
    appId: process.env.APPID,
    authDomain: process.env.AUTHDOMAIN,
    storageBucket: process.env.STORAGEBUCKET
}

export default env;