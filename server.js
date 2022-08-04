import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from "./src/routes/authRoutes.js"

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

server.use(authRoutes)

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Servidor conectado em ${PORT}`))