docker run -dp 3000:3000 \
  -w /imdb_scrape -v "$(pwd):/imdb_scrape" \
  --network imdb-scrape \
  -e MYSQL_HOST=mysql \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=secret \
  -e MYSQL_DB=imdb \
  node:12-alpine \
  sh -c "yarn install && tail -f /dev/null"