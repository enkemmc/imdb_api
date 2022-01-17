### db schemas
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

this code assumes it can access a sql database on the same docker network: imdb-scrape.  the shell script runs the code in a docker container which exits when complete
