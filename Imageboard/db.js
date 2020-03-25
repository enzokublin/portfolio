const spicedPg = require("spiced-pg");

let secret;
if (process.env.NODE_ENV === "production") {
    secret = process.env;
} else {
    secret = require("./secret");
}

const dbUrl =
    process.env.DATABASE_URL ||
    `postgres:${secret.dbUser}:${secret.dbPassword}@localhost:5432/imageboard`;

const db = spicedPg(dbUrl);

exports.selectCommentsByTheirId = function(image_id) {
    const q = `SELECT * FROM comments Where image_id =$1`;
    const params = [image_id || null];
    return db.query(q, params);
};

exports.attachComments = function(image_id, username, comment) {
    const q = `INSERT INTO comments (image_id, username, comment)
    VALUES ($1, $2, $3) RETURNING *`;
    const params = [image_id || null, username || null, comment || null];
    return db.query(q, params);
};

exports.selectImages = function() {
    return db.query(`SELECT * FROM images ORDER BY id DESC LIMIT 3`);
};

exports.selectImageByItsId = function(id) {
    const q = `SELECT * FROM images WHERE id = $1`;
    const params = [id || null];
    return db.query(q, params);
};

exports.attachPicture = function(title, description, username, url) {
    const q = `INSERT INTO images (title, description, username, url)
    VALUES ($1, $2, $3, $4) RETURNING *`;
    const params = [title || null, description || null, username || null, url];
    return db.query(q, params);
};

exports.showMorePictures = function(id) {
    const q = `SELECT * FROM images WHERE id < $1 ORDER BY id DESC LIMIT 3;`;
    const params = [id];
    return db.query(q, params);
}; // is for the more button.

// const q = `SELECT *FROM images WHERE id <$1 ORDER BY id DESC LIMIT 9`;
//
// SELECT id FROM images ORDER BY id ASC LIMIT 1`
//
//
