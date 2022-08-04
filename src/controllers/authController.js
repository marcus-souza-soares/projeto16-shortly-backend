import jwt from 'jsonwebtoken';
import connection from '../db/db.js';

export async function SignIn(req, res){
    const user = req.body;

    const secret_key = process.env.JWT_SECRET;
    const configToken = { expiresIn: 60 * 60 * 3}

    const { email, password } = user;

    const userFromDatabase = await connection.query(`
    SELECT`)
}

export function teste(req, res){
    res.send(["chegou aqui de boas", req.body])
}