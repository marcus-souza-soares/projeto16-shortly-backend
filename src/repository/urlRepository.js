import connection from "../db/db.js";

async function insertNewShortUrl(shortUrl, url, userId) {
    return await connection.query(
        `INSERT INTO urls ("shortUrl", url, "userId") 
        VALUES ('${shortUrl}', '${url}', ${userId})`
    )
}

async function selectUrlById(id) {
    return await connection.query(
        "SELECT * FROM urls WHERE id = $1", [id]
    )
}

async function selectShortUrlByName(shortUrl) {
    return await connection.query(
        `SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]
    )
}
async function incrementViewShortUrl(id) {
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
async function getUserDataAndUrls(id) {
    const { rows: user } = await connection.query(
        `
        SELECT users.id as "id", users.name, SUM(u."visitCount") as "visitCount"
        FROM users JOIN urls u ON users.id = u."userId"
        WHERE users.id = $1
        GROUP BY users.id
        `, [id]
    )
    const { rows: urls } = await connection.query(
        'SELECT * FROM urls WHERE "userId" = $1', [id]
    )
    return {
        ...user[0], shortenedUrls: urls
    }
}
async function selectUrlsLimited() {
    return await connection.query(
        `
        SELECT users.name, users.id, 
        SUM(urls."visitCount") as "visitCount",
        COUNT(urls."shortUrl") as "linksCount"
        FROM users 
        JOIN urls ON users.id = urls."userId"
        GROUP BY users.id
        ORDER BY "visitCount" ASC LIMIT 10
        `
    );
}
export const urlRepository = {
    insertNewShortUrl,
    selectUrlById,
    selectShortUrlByName,
    incrementViewShortUrl,
    deleteUrl,
    getUserDataAndUrls,
    selectUrlsLimited
}