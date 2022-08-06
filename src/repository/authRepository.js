import connection from "../db/db.js";

async function getUserByEmail(email){
    return await connection.query(
        "SELECT * FROM users WHERE email = $1", [email]
    )
}

async function createUser(name, email, crypted_password){
    await connection.query(
        `
        INSERT INTO users (name, email, password) 
        VALUES ('${name}', '${email}', '${crypted_password}')
        `
    )
}
async function incrementSession(token, userId){
    return await connection.query(
        `INSERT INTO sessions (token, "userId") 
        VALUES ('${token}', ${userId})
        `
    )
}
// async function getUserById(id){
//     return await connection.query(
//         "SELECT * FROM users WHERE id = $1", [id]
//     )
// }

export const authRepository = {
    getUserByEmail, 
    createUser,
    incrementSession,
}