import jwt from 'jsonwebtoken';
import connection from '../db/db.js';
import bcrypt from 'bcrypt';

export async function SignIn(req, res) {
    const {email, password} = req.body;

    const secret_key = process.env.JWT_SECRET;
    const configToken = { expiresIn: 60 * 60 * 3 }
    const { rows: verifyUserExists } = await connection.query(
        "SELECT * FROM users WHERE email = $1", [email]
    )
    console.log(verifyUserExists)
    const compare_password = bcrypt.compareSync(password, verifyUserExists[0].password);
    if(verifyUserExists.length < 1 || !compare_password){
        return res.status(401).send("Verifique os campos");
    }
    const userId = verifyUserExists[0].id;

    const token = jwt.sign({ userId }, secret_key, configToken);
    await connection.query(
        `INSERT INTO sessions (token, "userId") VALUES ('${token}', ${userId})
        `
    )
    res.status(200).send(token);
    // const userFromDatabase = await connection.query(`
    // SELECT`)
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