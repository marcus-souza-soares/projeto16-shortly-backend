import jwt from 'jsonwebtoken';
import connection from '../db/db.js';

export async function SignIn(req, res){
    const user = req.body;

    const secret_key = process.env.JWT_SECRET;
    const configToken = { expiresIn: 60 * 60 * 3}

    const { email, password } = user;
    function verifyUserExists(){
        email && password ? true : res.status(422).send("Insira os campos!");
        email && password ? true : res.status(422).send("Insira o e-mail!");
    }

    const userFromDatabase = await connection.query(`
    SELECT`)
}