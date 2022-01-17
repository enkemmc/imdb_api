const url = require('url')
const { log_failure } = require('./log_failure')

function derive_movie_id(href){
    try {
        const { pathname } = url.parse(href)
        const id = pathname.split('/title/')[1]
        return id.replace('/', '')
    } catch(e){
        const data = {
            name: 'derive_movie_id',
            reason: 'failed to parse ' + e
        }
        log_failure(data)
    }
}

module.exports = {
    derive_movie_id
}