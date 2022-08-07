import connection from "../db/db.js";
import { nanoid } from 'nanoid';
import { urlRepository } from "../repository/urlRepository.js";
import { authRepository } from "../repository/authRepository.js";


export async function postUrl(req, res) {
    const { url } = req.body;
    const { userId } = res.locals;

    const shortUrl = nanoid(9);
    await urlRepository.insertNewShortUrl(shortUrl, url, userId);
    res.status(201).send(
        {
            shortUrl
        }
    )
}

export async function getUrlById(req, res) {
    const { id } = req.params;

    const url = await urlRepository.selectUrlById(id);

    if (url.rowCount === 0) {
        return res.status(404).send("URL não encontrada")
    }
    const [dados] = url.rows;
    res.status(200).send({
        id: dados.id,
        shortUrl: dados.shortUrl,
        url: dados.url
    })
}

export async function getShortUrlByName(req, res) {
    const { shortUrl } = req.params;
    const result = await urlRepository.selectShortUrlByName(shortUrl)
    if (result.rowCount === 0) {
        return res.status(404).send("URL não encontrada");
    }
    const [link] = result.rows;
    await urlRepository.incrementViewShortUrl(link.id)
    res.redirect(link.url);
}

export async function deleteUrl(req, res) {
    const { id } = req.params;
    const { userId } = res.locals;

    const result = await urlRepository.selectUrlById(id)
    const id_user = result.rows[0].userId;
    console.log(result.rows)
    //caso a url não pertenca ao usuário 
    if (userId !== id_user){
        return res.sendStatus(401);
    }
    if (result.rowCount === 0) {
        return res.status(404).send("URL não encontrada");
    }
    await urlRepository.deleteUrl(id);
    res.status(204).send("Deletou");
}
export async function getRanking(req, res){
    const ranking = await urlRepository.selectUrlsLimited();
    res.status(200).send(ranking.rows)
}