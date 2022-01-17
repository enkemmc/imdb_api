note: this code assumes it can access a sql database on the same docker network: imdb-scrape.  

### DB schemas
#### movies
```javascript
{
	id: string,
	title: string,
	score: double
}
```
#### urls
```javascript
{
	root_url: string,
	children: string[]
}
```
### The shell scripts

dev.sh

this is used for adding on to the script.  creates an alpine container on the imdb-scrape docker network, whose /imdb_scrape directory mirrors our current working directory.  this allows us to develop locally, as though we were on the network.  you can then exec nodemon, or jest within the container to do the dev work, or you can replace the tail command with nodemon/jest and just watch the sysout stream via a command like: 
```
docker logs -f <container id>
```

scrape_once.sh

runs the code one time in a docker container which exits when complete.  this is the "production" version of this code, and is used for updating the data in the db

