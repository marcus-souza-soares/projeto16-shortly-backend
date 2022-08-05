import connection from "../db/db.js";
import { nanoid } from 'nanoid';

export async function postUrl(req, res) {
    const { url } = req.body;
    const { userId } = res.locals;

    const shortUrl = nanoid(9);
    await connection.query(
        `INSERT INTO urls ("shortUrl", url, "userId") 
        VALUES ('${shortUrl}', '${url}', ${userId})`
    )
    res.status(201).send(
        {
            shortUrl
        }
    )
}