docker run -d \
    --network imdb-scrape --network-alias mysql \
    -v imdb-mysql-data:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=secret \
    -e MYSQL_DATABASE=imdb \
    mysql:5.7
