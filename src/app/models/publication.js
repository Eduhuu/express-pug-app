const { client } = require("../db/index")
const commentModel = require("../models/comment")
const userModel = require("./user")

const getPublications = async (pageSize = "", pageNumber = "") => {
    const query = pageSize && pageNumber ? await client.query(`
        SELECT *
        FROM Publication
        WHERE blocked = FALSE
        LIMIT ${pageSize}
        OFFSET ${(pageNumber - 1) * pageSize}
    `, []) : await client.query(`
    SELECT *
    FROM Publication
    blocked = FALSE
    `, [])
    return await Promise.all(query.rows.map(async (publication) => {
        return {
            ...publication,
            user: await client.query(`
                SELECT img, name, lastname  
                FROM "User"
                WHERE id = $1
            `, [publication.autor_id]).then((res) => res.rows[0])
        }
    }))
}

const getCountPublication = async () => {
    const query = await client.query(`
        SELECT COUNT(*)
        FROM Publication
    `, [])
    return query.rows[0].count
}

const getPublication = async (id) => {
    const query = await client.query(`
        SELECT *
        FROM Publication
        WHERE id=$1
    `, [id]);

    const publication = query.rows[0]

    if(!publication) return null

    const commmets_query = await commentModel.getCommentByPublicationId(id)

    // populate comment.user
    const comments_with_users = await Promise.all(commmets_query.map(async (comment) => {
        const user = await userModel.getUserInfo(comment.autor_id)
        return { ...comment, user }
    }))


    // usuario que comento
    const user_query = await userModel.getPublicationAuthor(publication.autor_id)

    return {
        ...publication,
        comments: comments_with_users,
        user: user_query.rows[0]
    }
}

const createPublication = async (file, content, user_id, title) => {
    await client.query(`
        INSERT INTO Publication (image,content,autor_id,title, blocked)
        VALUES ($1, $2, $3, $4, $5);
    `, [file, content, user_id, title, "FALSE"]);
}

const editPublication = async (title, content, newFile, publication_id) => {
    await client.query(`
        UPDATE Publication
        SET title = $1, content = $2, image = $3
        WHERE id = $4;
    `, [title, content, newFile, publication_id])
}

const getStadisticsPublications = async () => {
    const query = await client.query(`
        SELECT *
        FROM Publication`, [])
    return await Promise.all(query.rows.map(async (publication) => {
        return {
            ...publication,
            comments: await client.query(`
                SELECT COUNT(*)  
                FROM Comment
                WHERE publication_id = $1
            `, [publication.id]).then((res) => res.rows[0])
        }
    }))
}

const getMaxPublicationUser = async () => {

    const query = await client.query(`
        SELECT u.name, COUNT(p.id) AS cant_publication
        FROM "User" u
        INNER JOIN Publication p ON p.autor_id = u.id
        GROUP BY u.name
        ORDER BY cant_publication DESC
        LIMIT 1;
    `)
    return query.rows[0]

}

const getPublicationCount = async () => {
    const query = await client.query(`
        SELECT COUNT(*)
        FROM Publication
    `)
    return query.rows[0].count
}

const deletePublication = async (id) => {
    await client.query(`
    DELETE FROM Publication
    WHERE id=$1
`, [id]);
}

const blockPublication = async (id) => {
    const publication = await getPublication(id)
    await client.query(`
    UPDATE Publication
    SET blocked = $2
    WHERE id = $1;
`, [id, !publication.blocked])
}

module.exports = {
    getCountPublication,
    getPublications,
    getPublication,
    createPublication,
    editPublication,
    getStadisticsPublications,
    getMaxPublicationUser,
    getPublicationCount,
    deletePublication,
    blockPublication
}