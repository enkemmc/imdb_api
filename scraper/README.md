// Schemas
// movies
{
	id: string,
	title: string,
	score: double
}
// urls
{
	root_url: string,
	children: string[]
}




// mysql container

docker run -d \
    --network imdb-scrape --network-alias mysql \
    -v imdb-mysql-data:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=secret \
    -e MYSQL_DATABASE=imdb \
    mysql:5.7


// app container

    create an alpine container on the imdb-scrape docker network, whose /imdb_scrape directory mirrors our current working directory
    this allows us to develop locally, as though we were on the network
    you can then run nodemon, or jest locally

docker run -dp 3000:3000 \
  -w /imdb_scrape -v "$(pwd):/imdb_scrape" \
  --network imdb-scrape \
  -e MYSQL_HOST=mysql \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=secret \
  -e MYSQL_DB=imdb \
  node:12-alpine \
  sh -c "yarn install && tail -f /dev/null"
