DROP TABLE registered_users CASCADE;

CREATE TABLE registered_users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    image_url VARCHAR(500),
    user_content VARCHAR(10000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE friendship CASCADE;

CREATE TABLE friendship(
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES registered_users(id),
    receiver_id INT NOT NULL REFERENCES registered_users(id),
    accepted BOOLEAN DEFAULT false
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE chat CASCADE;

CREATE TABLE chat(
    id SERIAL PRIMARY KEY,
    posters_id INT NOT NULL REFERENCES registered_users(id),
    chat_message VARCHAR(10000)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS wall;

CREATE TABLE wall(
    id SERIAL PRIMARY KEY,
    comment VARCHAR(10000),
    typers_id INT NOT NULL REFERENCES registered_users(id),
    owners_id INT NOT NULL REFERENCES registered_users(id),
    picture_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
