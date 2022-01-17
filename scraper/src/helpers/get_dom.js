const { JSDOM } = require('jsdom')

function get_dom(html, url){
    return new JSDOM(html, {
        url,
        referrer: "https://www.imdb.com/",
        resources: "usable"
    })
}

module.exports = {
    get_dom
}