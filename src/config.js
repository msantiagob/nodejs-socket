import { config } from 'dotenv';
config();

export const PORT = process.env.PORT || 3001;
console.log(process.env.MONGODB_URI);
export const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/socketsdb';
