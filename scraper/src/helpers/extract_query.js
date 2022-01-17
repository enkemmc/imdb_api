// e.g. "/search/title/?genres=comedy&start=51&explore=title_type,genres&ref_=adv_nxt"
// '?page=2&sort=moviemeter,asc&keywords=superhero&explore=keywords&mode=detail&ref_=kw_nxt#main'
function extract_query(href){
    return '?' + href.split('?')[1]
}

module.exports = {
    extract_query
}