DROP TABLE IF EXISTS signature;

CREATE TABLE signature(
    id SERIAL PRIMARY KEY,
    signature TEXT NOT NULL,
    user_id INTEGER UNIQUE NOT NULL
);

-- ############################################################
-- ############################################################
-- ############################################################

DROP TABLE registered_users CASCADE;

CREATE TABLE registered_users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
-- this is the users table
-- ############################################################
-- ############################################################
-- ############################################################

DROP TABLE IF EXISTS user_profiles;

CREATE TABLE user_profiles(
    id SERIAL PRIMARY KEY,
    age INT,
    city VARCHAR(100),
    url VARCHAR(300),
    user_id INTEGER UNIQUE NOT NULL


);
-- this key is a foreign key
--this is my user_profile table
