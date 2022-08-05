import jwt from 'jsonwebtoken';

export function userMiddleware(req, res, next) {
    const { authorization } = req.headers;
    if(!req.headers){
        return res.status(401).send("Acesso não autorizado.")
    }
    const token = authorization?.replace("Bearer ", "");
    const secret_key = process.env.JWT_SECRET;
    const dados = jwt.verify(token, secret_key);
    if (dados) {
        res.locals.userId = dados.userId;
        next();
    }else{
        res.status(404).send("Error ao validar o usuário");
    }
}