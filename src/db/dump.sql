CREATE TABLE "shortly";

\c shortly

CREATE TABLE shortyl.users (
id SERIAL PRIMARY KEY, 
name VARCHAR(100) UNIQUE NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password TEXT NOT NULL);
