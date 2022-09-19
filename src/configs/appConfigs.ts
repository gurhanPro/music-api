require('dotenv').config();

export const AppConfigs = {
  tokenExpiration: 7200,
  secret: process.env.SECRET,
  user: process.env.USER,
  databaseURL: process.env.DATABASE_URL,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
};
