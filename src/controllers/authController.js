import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { authRepository } from '../repository/authRepository.js';

export async function SignIn(req, res) {
    const {email, password} = req.body;

    const secret_key = process.env.JWT_SECRET;
    const configToken = { expiresIn: 60 * 60 * 3 }

    const { rows: verifyUserExists} = await authRepository.getUserByEmail(email)

    console.log(verifyUserExists)
    const compare_password = bcrypt.compareSync(password, verifyUserExists[0].password);
    if(verifyUserExists.length < 1 || !compare_password){
        return res.status(401).send("Verifique os campos");
    }
    const userId = verifyUserExists[0].id;

    const token = jwt.sign({ userId }, secret_key, configToken);
    await authRepository.incrementSession(token, userId);
    res.status(200).send(token);
}

export async function creatUser(req, res) {
    const { name, email, password } = req.body;
    const { rows: verify_email } = await authRepository.getUserByEmail(email);

    if (verify_email.length > 0){
        return res.status(409).send("usuário existente!")
    }
    const crypted_password = bcrypt.hashSync(password, 10);

    await authRepository.createUser(name, email, crypted_password)
    res.status(201).send("Ok");
}
