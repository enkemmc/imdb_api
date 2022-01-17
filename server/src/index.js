const express = require('express')
const app = express()
const db = require('./persistence/index')
const getItems = require('./routes/getItems')

const PORT = 3001
app.use(express.json())

app.get('/items', getItems)
app.get('/', (req, res) => {
    res.send('welcome!')
})


db.init().then(() => {
    app.listen(PORT, () => console.log(`listening on port ${PORT}`))
}).catch((err) => {
    console.error(err)
    process.exit(1)
})

const gracefulShutdown = () => {
    db.teardown()
        .catch(() => console.error(`error tearing down the db connection`))
        .then(() => process.exit(0))
}

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)
process.on('SIGUSR2', gracefulShutdown)