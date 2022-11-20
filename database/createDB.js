import pg from 'pg'
import configDB from "./configDB.js";
const {Pool} = pg;
const pool = new Pool({
    user: configDB.user,
    password: configDB.password,
    host: configDB.host,
    port: configDB.port
})

pool.query(`DROP DATABASE IF EXISTS ${configDB.database};
            CREATE DATABASE ${configDB.database}`).then(async ()=>
{
    const db = new Pool(configDB)
    await db.query(`
        CREATE TABLE users 
        (
            ID SERIAL PRIMARY KEY,
            first_name CHARACTER VARYING(255), 
            gender CHARACTER VARYING(30)
        );
`)
    await db.query(`
        CREATE TABLE subscriptions
        (
            userID INTEGER REFERENCES users (ID),
            subscriberID INTEGER REFERENCES users (ID),
            PRIMARY KEY (userID, subscriberID)
        );`)
})
