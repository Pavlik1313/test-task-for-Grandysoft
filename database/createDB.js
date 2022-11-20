import pg from 'pg'
import configDB from "./configDB.js";
const {Pool} = pg;
const pool = new Pool({
    user: configDB.user,
    password: configDB.password,
    host: configDB.host,
    port: configDB.port
})
const createDB = async () => {
    await pool.query(`DROP DATABASE IF EXISTS ${configDB.database}`);
    await pool.query(`CREATE DATABASE ${configDB.database}`);
    const db = new Pool(configDB);
    await db.query(`
        CREATE TABLE users 
        (
            id SERIAL PRIMARY KEY,
            first_name CHARACTER VARYING(255), 
            gender CHARACTER VARYING(30)
        );`)
    await db.query(`
        CREATE TABLE subscriptions
        (
            userId INTEGER REFERENCES users (id),
            subscriberId INTEGER REFERENCES users (id),
            PRIMARY KEY (userId, subscriberId)
        );`)

}
createDB()