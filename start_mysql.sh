docker run -dp 3306:33060 \
    --network imdb-scrape --network-alias mysql \
    -e MYSQL_ROOT_PASSWORD=secret \
    -e MYSQL_DATABASE=imdb \
    mysql:5.7
