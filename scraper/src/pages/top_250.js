const { get_raw_html, get_dom } = require('../helpers')

const url = 'https://www.imdb.com/chart/top/?ref_=nv_mv_250'

async function top_250(){
    console.log('scraping top 250')
    const { data } = await get_raw_html(url)
    const dom = get_dom(data, url)
    const { window } = dom
    const { document} = window
    const article = document.getElementsByClassName('article').item(1)
    const table = article.getElementsByTagName('tbody')[0]
    
    const movies = {}
    for (const row of table.children) {
        const titleColumn = row.getElementsByClassName('titleColumn').item(0).getElementsByTagName('a')[0]
        const title = titleColumn.innerHTML
        const id = titleColumn.href.split('/')[4]
        const score = row.getElementsByClassName('imdbRating').item(0).getElementsByTagName('strong')[0].innerHTML
        movies[id] = { title, score, id }
    }

    console.log('finished top 250')
    return movies
}

module.exports = {
    top_250
}
