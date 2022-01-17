const { get_dom } = require('./get_dom')
const { get_raw_html } = require('./get_raw_html')
const { log_failure } = require('./log_failure')
const { derive_movie_id } = require('./derive_movie_id')
const { extract_query } = require('./extract_query')

module.exports = {
    get_dom,
    get_raw_html,
    log_failure,
    derive_movie_id,
    extract_query
}