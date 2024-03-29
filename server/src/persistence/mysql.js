const waitPort = require('wait-port')
const fs = require('fs')
const mysql = require('mysql')
require('dotenv').config()

const TABLE_NAME = 'imdb'

const {
    MYSQL_HOST: HOST,
    MYSQL_HOST_FILE: HOST_FILE,
    MYSQL_USER: USER,
    MYSQL_USER_FILE: USER_FILE,
    MYSQL_PASSWORD: PASSWORD,
    MYSQL_PASSWORD_FILE: PASSWORD_FILE,
    MYSQL_DB: DB,
    MYSQL_DB_FILE: DB_FILE,
} = process.env;

let pool;

async function init() {
    console.log('api server attempting to connect to db')
    const host = HOST_FILE ? fs.readFileSync(HOST_FILE) : HOST;
    const user = USER_FILE ? fs.readFileSync(USER_FILE) : USER;
    const password = PASSWORD_FILE ? fs.readFileSync(PASSWORD_FILE) : PASSWORD;
    const database = DB_FILE ? fs.readFileSync(DB_FILE) : DB;

    await waitPort({ host, port : 3306});
    console.log('api server succcessfully connected to db')

    pool = mysql.createPool({
        connectionLimit: 5,
        host,
        user,
        password,
        database,
    });


    return new Promise((acc, rej) => {
        pool.query(
            `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (id varchar(36) UNIQUE, title varchar(255), score float) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
            err => {
                if (err) return rej(err);

                console.log(`Connected to mysql db at host ${HOST}`);
                acc();
            },
        );
    });
}

async function teardown() {
    return new Promise((acc, rej) => {
        pool.end(err => {
            if (err) rej(err);
            else acc();
        });
    });
}

async function getItems() {
    return new Promise((acc, rej) => {
        pool.query(`SELECT * FROM ${TABLE_NAME}`, (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item),
                ),
            );
        });
    });
}

async function getItem(id) {
    return new Promise((acc, rej) => {
        pool.query(`SELECT * FROM ${TABLE_NAME} WHERE id=?`, [id], (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item),
                )[0],
            );
        });
    });
}

async function storeItem(item) {
    return new Promise((acc, rej) => {
        pool.query(
            `REPLACE INTO ${TABLE_NAME} (id, title, score) VALUES (?, ?, ?)`,
            [item.id, item.title, item.score],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

async function updateItem(id, item) {
    return new Promise((acc, rej) => {
        pool.query(
            `UPDATE ${TABLE_NAME} SET title=?, score=? WHERE id=?`,
            [item.title, item.score, id],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

async function removeItem(id) {
    return new Promise((acc, rej) => {
        pool.query(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, [id], err => {
            if (err) return rej(err);
            acc();
        });
    });
}

module.exports = {
    init,
    teardown,
    getItems,
    getItem,
    storeItem,
    updateItem,
    removeItem,
};
