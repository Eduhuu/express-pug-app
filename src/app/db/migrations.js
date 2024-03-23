const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
})


async function createMigrations() {
    await client.connect();

    // Crear la tabla Usuario
    await client.query(`
    CREATE TYPE USER_TYPES AS ENUM ('admin','user');
    CREATE TABLE "User" (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      rol USER_TYPES NOT NULL,
      img VARCHAR(255) NOT NULL,
      blocked BOOLEAN NOT NULL
    );
  `);

    // Crear la tabla Publicacion
    await client.query(`
    CREATE TABLE Publication (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      autor_id INTEGER REFERENCES "User"(id) ON DELETE CASCADE,
      creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      blocked BOOLEAN NOT NULL
    );
  `);

    // Crear la tabla Comentario
    await client.query(`
    CREATE TABLE Comment (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      autor_id INTEGER REFERENCES "User"(id) ON DELETE CASCADE,
      publication_id INTEGER REFERENCES Publication(id) ON DELETE CASCADE,
      creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

    console.log("Migrations completed!")

    await client.end();
}

createMigrations();