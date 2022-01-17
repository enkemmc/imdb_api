const { top_250, genre } = require('./pages')
const db = require('./persistence')

const standard = async function() {
    const fns = [top_250, genre]
    const proms = []
    for (const fn of fns){
        proms.push(handle(fn))
    }
    await Promise.all(proms)
}

// takes an async function that produces a movies object
// awaits the function and then stores each kv in object in the db
async function handle(fn){
    const movies = await fn()
    for (const key in movies) {
        const item = movies[key]

        // db[key] = movies[key]
        await db.storeItem(item)
    }
}

module.exports = {
    standard
}