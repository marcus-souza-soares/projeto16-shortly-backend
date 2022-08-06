import connection from "../db/db.js";
import { nanoid } from 'nanoid';
import { urlRepository } from "../repository/urlRepository.js";


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

export async function getShortUrlByName(req, res){
    const { shortUrl } = req.params;
    const result  = await urlRepository.selectShortUrlByName(shortUrl)
    if(result.rowCount === 0){
        return res.status(404).send("URL não encontrada");
    }
    const [link] = result.rows;
    await urlRepository.incrementViewShortUrl(link.id)
    res.redirect(link.url);
}