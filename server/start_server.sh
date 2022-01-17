docker run -dp 3001:3001 \
    -w /server -v "$(pwd):/server" \
    --network imdb-scrape \
    -e MYSQL_HOST=mysql \
    -e MYSQL_USER=root \
    -e MYSQL_PASSWORD=secret \
    -e MYSQL_DB=imdb \
    --name imdb-server-dev \
    node:12-alpine \
    sh -c "npm run dev"