const spicedPg = require("spiced-pg");
const secrets = require("../secrets");
const dbUrl = `postgres://${secrets.dbUser}:${
  secrets.dbPassword
}@localhost:5432/socialnetwork`;
const db = spicedPg(dbUrl);

const bcrypt = require("bcryptjs");
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

exports.getDatabasePw = function(email) {
  let q = `SELECT password FROM registered_users WHERE email = $1`;
  let params = [email || null];
  return db.query(q, params);
};

exports.checkPassword = function checkPassword(
  textEnteredInLoginForm,
  hashedPasswordFromDatabase
) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function(
      err,
      doesMatch
    ) {
      if (err) {
        reject(err);
      } else {
        resolve(doesMatch);
      }
    });
  });
};
