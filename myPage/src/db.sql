DROP TABLE emkblog;

CREATE TABLE emkblog
(
    id SERIAL PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    blog_title VARCHAR(255) NOT NULL,
    image_url VARCHAR(500),
    content_text VARCHAR(8000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);