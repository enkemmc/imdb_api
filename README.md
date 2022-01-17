**Why does this exist?**

IMDB doesnt provide a public api.  This project scrapes some imdb pages and stores the movie names and ratings in a database.  It then serves the database through one endpoint via a rest api.  It also has a very simple webclient that displays whats in the database and a simple filter of the movie names by substring.


**What are these subfolders?**

**client** - html page for viewing data in the sql db via the server

**server** - serves getAll function over tcp

**scraper** - scrapes imdb pages and puts the data into the server




the server and scraper depend on a mysql database being available on their network
