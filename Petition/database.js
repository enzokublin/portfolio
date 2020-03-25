const spicedPg = require("spiced-pg");

//If we create a "secret.json" file with password and "login Id" and put it in a "gitignore" file.

// #####This part lays the foundation for the authorization and authentication.
const bcrypt = require("bcryptjs");

// #####name of database########################################################

//this when we create a secret.json with password and stuff, for git ignore

let secret;
let dbUrl;
//if production the first, if development the second db will be activated;
if (process.env.NODE_ENV === "production") {
    secret = process.env;
    dbUrl = process.env.DATABASE_URL;
} else {
    secret = require("./secret");
    dbUrl = `postgres://${secret.dbUser}:${
        secret.dbPassword
    }@localhost:5432/petition`;
}

//name
//if production the first, if development the second db will be activated;
const db = spicedPg(dbUrl);

// #############################################################################
// ####################### For Registered Users While they are logging in ######
// #############################################################################

exports.checkForUserInfos = function(email) {
    let q = `
    SELECT firstname, lastname, registered_users.id as user_id, signature.id as signature_id
    FROM registered_users
    FULL OUTER JOIN signature
    ON signature.user_id = registered_users.id
    WHERE email = $1
    `;
    let params = [email || null];
    return db.query(q, params);
};

// #############################################################################
// #############################################################################
// #############################################################################

exports.insertNewUser = function(first, last, email, hashedPw) {
    let q = `
        INSERT INTO registered_users
        (firstname, lastname, email, password)
        VALUES
        ($1, $2, $3, $4)
        RETURNING id
    `;
    let params = [first || null, last || null, email || null, hashedPw || null];

    return db.query(q, params);
};

// #############################################################################
// #############################################################################
// #############################################################################

exports.hashPassword = function(plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
};

// #############################################################################
// ######################## getDatabasePw ######################################
// #############################################################################

exports.getDatabasePw = function(email) {
    let q = `SELECT password FROM registered_users WHERE email = $1`;
    let params = [email || null];
    return db.query(q, params);
};

// #############################################################################
// ############################ checkPassword Function #########################
// #############################################################################

exports.checkPassword = function checkPassword(
    textEnteredInLoginForm,
    hashedPasswordFromDatabase
) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(
            textEnteredInLoginForm,
            hashedPasswordFromDatabase,
            function(err, doesMatch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doesMatch);
                }
            }
        );
    });
};

// #############################################################################
// ############################  Delete User Infos #############################
// #############################################################################

exports.deleteUsersProfile = function(id) {
    const q1 = `DELETE FROM signature WHERE user_id = $1`;
    const params1 = [id || null];
    const q2 = `DELETE FROM user_profiles WHERE user_id = $1`;
    const q3 = `DELETE FROM registered_users WHERE id = $1`;

    return Promise.all([
        db.query(q1, params1),
        db.query(q2, params1),
        db.query(q3, params1)
    ]);
};

// #############################################################################
// ############################  Delete the Signature ##########################
// #############################################################################

exports.deleteSignature = function(id) {
    let q = `DELETE FROM signature WHERE user_id = $1`;
    let params = [id || null];
    return db.query(q, params);
};

// #############################################################################
// ############################ Signature Export ###############################
// #############################################################################

exports.submitSign = function(signature, userId) {
    let q = `INSERT INTO signature
    (signature, user_id)
    VALUES($1, $2)
    RETURNING id`;
    //######## The "id" will save the signature for us.
    let params = [signature || null, userId];
    //######## they way you structer your code is important.#####

    return db.query(q, params);
};

// #############################################################################
// ############################ Select Signature Id/ Image #####################
// #############################################################################
exports.getSignatureImg = function(id) {
    let q = `SELECT signature FROM signature WHERE id = $1`;
    let params = [id];
    return db.query(q, params);
};

// #############################################################################
// ############################ Select Signature Id/ Image #####################
// #############################################################################

exports.getSignertories = function() {
    let q = `
    SELECT registered_users.id AS user_id, firstname, lastname, age, city, url
    FROM registered_users
    JOIN signature
    ON signature.user_id = registered_users.id
    FULL OUTER JOIN user_profiles
    ON user_profiles.user_id = registered_users.id;
    `;
    return db.query(q);
};

exports.getSignertoriesdueToTheirCity = function(city) {
    const q = `
    SELECT registered_users.id AS user_id, firstname, lastname, age, city, url
    FROM registered_users
    JOIN signature
    ON signature.user_id = registered_users.id
    FULL OUTER JOIN user_profiles
    ON user_profiles.user_id = registered_users.id
    WHERE LOWER(city) = LOWER($1);
    `;
    let params = [city];
    return db.query(q, params);
};

// #############################################################################
// ############################ User_ID ########################################
// #############################################################################

exports.insartUserId = function insartUserId(user_id) {
    return db.query(
        `INSERT INTO signature (user_id) VALUES ($1) RETURNING id`,
        [user_id]
    );
};

// #############################################################################
// ######################### User-Profile Information ##########################
// #############################################################################

exports.getUserEmailForIdentification = function(email) {
    let q = `SELECT id FROM registered_users WHERE email = $1`;
    let params = [email || null];
    return db.query(q, params).then(result => {
        return result.rows[0].id;
    });
};

// #############################################################################
// ######################### User-Profile Information ##########################
// #############################################################################

exports.getUserProfileInfos = function(user_id, age, city, url) {
    let q = `INSERT INTO user_profiles
    (user_id, age, city, url)
    VALUES($1,$2,$3,$4)`;
    let params = [user_id, age, city, url];
    return db.query(q, params);
};

// #############################################################################
// ################## Count Users ##############################################
// #############################################################################

exports.getUserNumbers = function() {
    return db.query(`SELECT COUNT (*) FROM signature;`).then(num => {
        return num.rows[0].count;
    });
};

// #############################################################################
// ################## presentEveryoneWhoSigned #################################
// #############################################################################

exports.presentEveryoneWhoSigned = function() {
    return db
        .query(
            `SELECT registered_users.first, registered_users.last, user_profiles.age, user_profiles.city, user_profiles.url
    FROM registered_users
    JOIN user_profiles
    ON registered_users.id = user_profiles.user_id
    JOIN signature
    ON registered_users.id = signature.user_id
    ;`
        )
        .then(result => {
            return result.rows;
        });
};

// #############################################################################
// ######################### Edit User Profile #################################
// #############################################################################
exports.getEditUserProfileData = function(id, firstname, lastname, email) {
    let q = `UPDATE registered_users SET firstname =$1, lastname =$2, email =$3 WHERE id =$4`;
    let params = [firstname, lastname, email, id];
    return db.query(q, params);
};

exports.getUpdatedUserProfileInfos = function(id, age, city, url) {
    let q = `INSERT INTO user_profiles (user_id, age, city, url) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id) DO UPDATE SET age =$1, city =$2, url =$3`;
    let params = [id || null, age || null, city || null, url || null];
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

exports.joinTwoTablesData = function(id) {
    let q = `SELECT registered_users.firstname, registered_users.lastname, registered_users.email, user_profiles.age, user_profiles.city, user_profiles.url
FROM registered_users
FULL OUTER JOIN user_profiles
ON registered_users.id = user_profiles.user_id WHERE registered_users.id =$1;`;
    let params = [id];
    return db
        .query(q, params)
        .then(result => {
            return result.rows;
        })
        .catch(function(err) {
            console.log(err);
        });
};
