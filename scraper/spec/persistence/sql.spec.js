const db = require('../../src/persistence/mysql')
const fs = require('fs')
require('dotenv').config()

const location = 'somewhere'

const ITEM = {
    title: 'Fake Movie Title',
    score: 7.7,
    id: 'tt15940604'
}

test('env variables were readable', () => {
    const { MYSQL_HOST: host } = process.env
    expect(host).toBe('mysql')
})

test('it initializes correctly', async () => {
    await db.init()
})

test('it can store and retrieve items', async () => {
    await db.init()

    await db.storeItem(ITEM)

    const items = await db.getItems()
    expect(items.length).toBe(1)
    expect(items[0]).toEqual(ITEM)
})