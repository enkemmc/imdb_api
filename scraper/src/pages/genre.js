const { get_raw_html, get_dom, log_failure, derive_movie_id, extract_query } = require('../helpers')
// const url = require('url')

const url = 'https://www.imdb.com/feature/genre/'

async function genre(){
    console.log('scraping genres')
    const { data } = await get_raw_html(url)
    const dom = get_dom(data, url)
    const { window } = dom
    const { document } = window

    const genre_title_to_url = {}
    const main = document.getElementById('main')
    const articles = main.getElementsByClassName('article')

    article_loop:
    for (const article of articles){
        const aTags = article.getElementsByTagName('a')
        let img
        for (const a of aTags){
            const src = a.href
            // console.log(src)
            img = a.getElementsByTagName('img').item(0)
            if (img){
                genre_title_to_url[img.title] = src
            } else {
                break article_loop
            }
        }
    }

    const ratings = {}
    const proms = []
    for (const key in genre_title_to_url){
        const src = genre_title_to_url[key]
        proms.push(handle_genre(ratings, src, key))
    }

    await Promise.all(proms)

    console.log('finished genres')
    return ratings
}

async function handle_genre(ratings, src, key){
        const max = 5
        let count = 0

        loop:
        while (count < max){
            let next_url = await get_ratings(src, ratings, count, max, key)
            if (!next_url) {
                break loop
            } else {
                src = next_url
            }
            count++
        }
}

async function get_ratings(url, ratings, count, max, key){
    console.log(`parsing page ${count + 1}/${max} of ${key}`)
    let window, document

    try {
        const { data } = await get_raw_html(url)
        const dom = get_dom(data, url)
        window = dom.window
        document = window.document
    } catch(e){
        const data = {
            name: 'get_raw_html',
            reason: e.message
        }
        log_failure(data)
        return
    }

    const items = document.getElementsByClassName('lister-item-content')
    let temp_name
    for (const item of items){
        temp_name = ''
        try {
            const h3 = item.getElementsByTagName('h3')[0]
            const a = h3.getElementsByTagName('a')[0]
            const id = derive_movie_id(a.href)
            const title = a.innerHTML
            temp_name = title
            const ratings_bar = item.getElementsByClassName('ratings-imdb-rating')[0]
            const rating = ratings_bar.attributes.getNamedItem('data-value').value
            ratings[id] = { title, score: rating, id }
        } catch(e) {
            const data = {
                name: 'get_ratings',
                reason: `no ratings yet for ${temp_name}`
            }
            await log_failure(data)
        }
    }

    // get next url
    //const u =  document.getElementsByClassName('footer').item(0).getElementsByTagName('a')[0].href
    const href = document.getElementsByClassName('next-page').item(0).getAttribute('href')

    const qparams = extract_query(href) 

    // return 'https://www.imdb.com/' + u
    return document.location.origin + document.location.pathname + qparams
}

module.exports = {
    genre
}
