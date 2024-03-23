const { client } = require("../db/index")

const createComment = async (comment, user_id, publication_id) => {
    await client.query(`
    INSERT INTO Comment (content,autor_id,publication_id)
    VALUES ($1, $2, $3);
`, [comment, user_id, publication_id]);
}

const deleteComment = async (comment_id) => {
    await client.query(`
    DELETE FROM Comment
    WHERE id=$1
`, [comment_id]);
}

const getCommentsCount = async () => {
    const query = await client.query(`
        SELECT COUNT(*)
        FROM Comment
    `)
    return query.rows[0].count
}

const getMaxCommentUser = async () => {
    const query = await client.query(`
    SELECT u.name, COUNT(c.id) AS cant_comments
    FROM "User" u
    INNER JOIN Comment c ON c.autor_id = u.id
    GROUP BY u.name
    ORDER BY cant_comments DESC
    LIMIT 1;
`)
    console.log(query.rows[0])
    return query.rows[0]
}

const getUserCount = async () => {
    const query = await client.query(`
        SELECT COUNT(*)
        FROM "User"
    `)
    return query.rows[0].count
}

const getCommentByPublicationId = async (id) => {
    const commmets_query = await client.query(`
        SELECT *
        FROM Comment
        WHERE publication_id=$1
    `, [id])
    return commmets_query.rows
}
module.exports = {
    createComment,
    deleteComment,
    getCommentsCount,
    getMaxCommentUser,
    getUserCount,
    getCommentByPublicationId,
}