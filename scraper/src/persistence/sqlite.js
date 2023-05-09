const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
// const location = process.env.SQLITE_DB_LOCATION || '/etc/imdb-scrape/imdb-scrape.db';
const location = 'imdb.db'

let db, dbAll, dbRun;
const TABLE_NAME = 'imdb'

function init() {
    console.log('initializing sqlite')
    const dirName = require('path').dirname(location);
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
    }

    return new Promise((acc, rej) => {
        db = new sqlite3.Database(location, err => {
            if (err) return rej(err);

            if (process.env.NODE_ENV !== 'test')
                console.log(`Using sqlite database at ${location}`);

            db.run(
                `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (id varchar(36) UNIQUE, title varchar(255), score float)`,
                (err, result) => {
                    if (err) return rej(err);
                    acc();
                },
            );
        });
    });
}

async function teardown() {
    return new Promise((acc, rej) => {
        db.close(err => {
            if (err) rej(err);
            else acc();
        });
    });
}

async function getItems() {
    return new Promise((acc, rej) => {
        db.all(`SELECT * FROM ${TABLE_NAME}`, (err, rows) => {
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
        db.all(`SELECT * FROM ${TABLE_NAME} WHERE id=?`, [id], (err, rows) => {
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
        db.run(
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
        db.run(
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
        db.run(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, [id], err => {
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
