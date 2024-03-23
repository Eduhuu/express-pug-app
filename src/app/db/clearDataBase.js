const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
})


async function clearDataBase() {
    await client.connect();
    await client.query(`
        DROP SCHEMA public CASCADE;
        CREATE SCHEMA public;
  `);
  await client.end();
  console.log("Database clear!")
}

clearDataBase()