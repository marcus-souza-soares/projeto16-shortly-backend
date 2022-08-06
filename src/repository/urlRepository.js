import connection from "../db/db.js";

async function insertNewShortUrl(shortUrl, url, userId){
    return await connection.query(
        `INSERT INTO urls ("shortUrl", url, "userId") 
        VALUES ('${shortUrl}', '${url}', ${userId})`
    )
}

async function selectUrlById(id){
    return await connection.query(
        "SELECT * FROM urls WHERE id = $1", [id]
    )
}

async function selectShortUrlByName(shortUrl){
    return await connection.query(
        `SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]
    )
}
async function incrementViewShortUrl(id){
    return await connection.query(
        `UPDATE urls SET "visitCount" = "visitCount" + 1
         WHERE id = $1`, [id]
    )
}

async function deleteUrl(id) {
    return await connection.query(
        'DELETE FROM urls WHERE id = $1', [id]
    )
}
export const urlRepository = {
    insertNewShortUrl,
    selectUrlById,
    selectShortUrlByName,
    incrementViewShortUrl,
    deleteUrl
}