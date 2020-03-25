const spicedPg = require("spiced-pg");
const secrets = require("../secrets");
const dbUrl = `postgres://${secrets.dbUser}:${
  secrets.dbPassword
}@localhost:5432/socialnetwork`;
const db = spicedPg(dbUrl);

exports.insertNewUser = function(firstname, lastname, email, hashedPw) {
  let q = `INSERT INTO registered_users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING id`;
  let params = [
    firstname || null,
    lastname || null,
    email || null,
    hashedPw || null
  ];
  return db.query(q, params);
};

exports.checkForUserInfos = function(email) {
  let q = `SELECT firstname, lastname, registered_users.id as userId FROM registered_users WHERE email = $1`;
  let params = [email || null];
  return db.query(q, params);
};

exports.getUserEmailForIdentification = function(email) {
  let q = `SELECT id FROM registered_users WHERE email = $1`;
  let params = [email || null];
  return db.query(q, params).then(result => {
    return result.rows[0].id;
  });
};

exports.getUserProfileInfos = function(userId, lastname, firstname, email, pw) {
  let q = `INSERT INTO registered_users (userId, lastname, firstname, email, pw) VALUES($1,$2,$3,$4 $5)`;
  let params = [user_id, url];
  return db.query(q, params);
};

exports.getUserProfileById = function(id) {
  let q = `SELECT firstname, lastname, image_url, user_content FROM registered_users WHERE id = $1`;
  let params = [id];
  return db.query(q, params);
};

exports.setUserProfileImage = function(url, id) {
  let q = `UPDATE registered_users SET image_url = $1 WHERE id =$2 returning *`;
  let params = [url, id];
  return db.query(q, params);
};

exports.getUserProfileDataUpdate = function(id, firstname, lastname, email) {
  let q = `UPDATE registered_users SET firstname =$1, lastname =$2, email =$3 WHERE id =$4`;
  let params = [firstname, lastname, email, id];
  return db.query(q, params);
};

exports.getUserPasswordUpdate = function(
  id,
  firstname,
  lastname,
  email,
  hashedPw
) {
  let q = `UPDATE registered_users SET firstname =$1, lastname =$2, email =$3, password=$4 WHERE id =$5`;
  let params = [firstname, lastname, email, hashedPw, id];
  return db.query(q, params);
};

exports.deleteUsersProfile = function(id) {
  const q = `DELETE FROM registered_users WHERE id = $1`;
  const params = [id || null];
  return db.query(q, params);
};

exports.updateUsersBio = function(user_content, id) {
  const q = `UPDATE registered_users SET user_content = $1 WHERE id = $2 RETURNING *;`;
  const params = [user_content, id];
  return db.query(q, params);
};

exports.selectOppById = function(id) {
  const q = `SELECT firstname, lastname, image_url, user_content FROM registered_users WHERE id = $1;`;
  const params = [id || null];
  return db.query(q, params);
};

exports.getBearBuddyship = function(
  registered_users_id,
  potential_buddybear_id
) {
  const q = `SELECT * FROM friendship WHERE (sender_id = $1 AND receiver_id = $2) OR (receiver_id = $1 AND sender_id = $2);`;
  const params = [registered_users_id, potential_buddybear_id];
  return db.query(q, params);
};

exports.sendBuddyBearRequest = function(sender_id, receiver_id) {
  const q = `INSERT INTO friendship (sender_id, receiver_id) VALUES ($1, $2) RETURNING *;`;
  const params = [sender_id, receiver_id];
  return db.query(q, params);
};

exports.acceptBearBuddyship = function(sender_id, receiver_id) {
  const q = `UPDATE friendship SET accepted = true WHERE (receiver_id=$1 AND sender_id = $2) OR (sender_id=$1 AND receiver_id = $2) RETURNING receiver_id, sender_id, accepted, id;`;
  const params = [sender_id, receiver_id];
  return db.query(q, params);
};

exports.endBearBuddyship = function(sender_id, receiver_id) {
  const q = `DELETE FROM friendship WHERE (receiver_id=$1 AND sender_id = $2) OR (sender_id=$1 AND receiver_id = $2);`;
  const params = [sender_id, receiver_id];
  return db.query(q, params);
};

// ########################################################
exports.selectBuddyBear = function(id) {
  const q = `
        SELECT registered_users.id, firstname, lastname, image_url
        FROM friendship
        JOIN registered_users
        ON (accepted = false AND receiver_id = $1 AND sender_id = registered_users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = registered_users.id)
        OR (accepted = true AND sender_id = $1 AND receiver_id = registered_users.id)
    ;`;
  const params = [id];
  return db.query(q, params);
};

exports.getUsersByIds = function getUsersByIds(arrayOfIds) {
  const q = `SELECT id, firstname, lastname, image_url FROM registered_users WHERE id = ANY($1)`;
  const params = [arrayOfIds];
  return db.query(q, params);
};

exports.getSpiceBearById = function(id) {
  const q = `SELECT id, firstname, lastname, image_url FROM registered_users WHERE id = $1;`;
  const params = [id];
  return db.query(q, params);
};

exports.getBuddyBearsAndWannabieBuddyBears = function(id) {
  const q = `
    SELECT registered_users.id, firstname, lastname, image_url, accepted, sender_id
    FROM friendship
    JOIN registered_users
    ON (accepted = false AND receiver_id = $1 AND sender_id = registered_users.id)
    OR (accepted = true AND receiver_id = $1 AND sender_id = registered_users.id)
    OR (accepted = true AND sender_id = $1 AND receiver_id = registered_users.id)
    OR (accepted = false AND sender_id = $1 AND receiver_id = registered_users.id)
    `;
  const params = [id];
  return db.query(q, params);
};

exports.insertBuddyBearsPost = function(posters_id, chat_message) {
  const q = `INSERT INTO chat (posters_id, chat_message) VALUES ($1, $2);`;
  const params = [posters_id, chat_message];
  return db.query(q, params);
};

exports.getBuddyBearsPost = function(posters_id) {
  const q = `SELECT registered_users.id, firstname, lastname, image_url, chat_message
  FROM chat
  JOIN registered_users ON registered_users.id = chat.posters_id ORDER BY chat.id DESC LIMIT 10;
    `;

  return db.query(q);
};

exports.insertWallPosts = function(
  comment,
  typers_id,
  owners_id,
  created_at,
  picture_url
) {
  const q = `INSERT INTO comments (typers_id, comment, owners_id, picture_url, created_at)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const params = [
    comment || null,
    typers_id || null,
    owners_id || null,
    picture_url || null,
    created_at || null
  ];
  return db.query(q, params);
};

exports.getWallPosts = function() {
  const q = `SELECT registered_users.id, firstname, lastname, image_url, comment, picture_url, wall.created_at
    FROM wall
    JOIN registered_users ON registered_users.id = wall.owners_id ORDER BY wall.id DESC
        LIMIT 10;`;

  return db.query(q);
};
