import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Servidor conectado em ${PORT}`))