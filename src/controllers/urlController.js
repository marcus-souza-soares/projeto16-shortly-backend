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

export async function getUrlById(req, res) {
    const { id } = req.params;
    const url = await connection.query(
        "SELECT * FROM urls WHERE id = $1", [id]
    )
    if(url.rowCount === 0){
        return res.status(404).send("URL não encontrada")
    }
    const [dados] = url.rows;
    res.status(200).send({
        id: dados.id,
        shortUrl: dados.shortUrl,
        url: dados.url
    })
}