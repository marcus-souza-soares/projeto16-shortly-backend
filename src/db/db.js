import pkg from 'pg';
import dotenv from 'dotenv'

dotenv.config();

const dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
  };

const { Pool } = pkg;


const connection = new Pool(dbConfig);
export default connection;

