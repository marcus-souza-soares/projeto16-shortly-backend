import jwt from 'jsonwebtoken';
import connection from '../db/db.js';
import bcrypt from 'bcrypt' 

export async function SignIn(req, res) {
    const user = req.body;

    const secret_key = process.env.JWT_SECRET;
    const configToken = { expiresIn: 60 * 60 * 3 }

    const { email, password } = user;

    const userFromDatabase = await connection.query(`
    SELECT`)
}

export async function creatUser(req, res) {
    const { name, email, password } = req.body;
    const { rows: verify_email } = await connection.query(
        "SELECT * FROM users WHERE email = $1", [email]
        )
    console.log("chegou")

    if (verify_email.length > 0){
        return res.status(409).send("usuário existente!")
    }
    const crypted_password = bcrypt.hashSync(password, 10);
    await connection.query(
        `
        INSERT INTO users (name, email, password) 
        VALUES ('${name}', '${email}', '${crypted_password}')
        `
    )
    res.status(201).send("Ok");
}

export function teste(req, res) {
    res.send(["chegou aqui de boas", req.body])
}