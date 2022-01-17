// this server is to support the ../client by providing read access to the mysql server
// this command starts a container that bind mounts (links) our pwd to the container's /server path
// the container is on the imdb-scrape network so that it has access to our mysql container
// and the tail command is to prevent the container from immediately exiting

docker run -dp 3001:3001 \
    -w /server -v "$(pwd):/server" \
    --network imdb-scrape \
    -e MYSQL_HOST=mysql \
    -e MYSQL_USER=root \
    -e MYSQL_PASSWORD=secret \
    -e MYSQL_DB=imdb \
    --name imdb-server-dev \
    node:12-alpine \
    sh -c "tail -f /dev/null"