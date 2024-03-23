const { client } = require("../db/index")

const isUserExist = async (user) => {
    const userCont = await client.query(`
        SELECT COUNT(*) FROM "User" WHERE email=$1;
  `, [user.email]);
    return userCont.rows[0].count > 0
}

const getUserInfo = async (user_id) => {
    const query = await client.query(`
        SELECT *
        FROM "User"
        WHERE id = $1;
    `, [user_id]);
    return query.rows[0]
}

const getUsers = async () => {
    const query = await client.query(`
    SELECT *
    FROM "User"
`, []);
    return query.rows
}

const getUserByEmail = async (email) => {
    const query = await client.query(`
        SELECT id, rol, password, blocked
        FROM "User"
        WHERE email = $1;
    `, [email]);
    return query.rows[0]
}

const countUsersByEmail = async (email) => {
    const query = await client.query(`SELECT COUNT(*)
       FROM "User"
       WHERE email=$1; 
       `, [email]);
    const user_count = query.rows[0].count
    return user_count
}

const createUser = async (name, lastname, email, hashedPassword, file) => {
    await client.query(`
        INSERT INTO "User" (name, lastname, email, password, rol, img, blocked)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
    `, [name, lastname, email, hashedPassword, "user", file, "FALSE"]);
}

const changeUserPassword = async (hashedPassword, valid_email) => {
    await client.query(`
        UPDATE "User"
        SET password = $1
        WHERE email=$2
 `, [hashedPassword, valid_email]);
}

const updateUser = async (name, lastname, email, user_id, update_img) => {
    await client.query(`
    UPDATE "User"
    SET name = $1, lastname = $2, email = $3, img = $5
    WHERE id = $4;
`, [name, lastname, email, user_id, update_img])
}

const getPublicationAuthor = async (autor_id) => {
    return await client.query(`
    SELECT *
    FROM "User"
    WHERE id = $1
`, [autor_id])
}

const deleteUser = async (user_id) => {
    await client.query(`
        DELETE FROM "User"
        WHERE id=$1
`, [user_id]);
}

const blockUser = async (user_id) => {
    const user = await getUserInfo(user_id)
    await client.query(`
    UPDATE "User"
    SET blocked = $2
    WHERE id = $1;
`, [user_id, !user.blocked])
}

module.exports = {
    getUserByEmail,
    getUserInfo,
    getUsers,
    isUserExist,
    createUser,
    countUsersByEmail,
    changeUserPassword,
    updateUser,
    getPublicationAuthor,
    deleteUser,
    blockUser
}