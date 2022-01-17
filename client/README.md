start_client_dev.sh starts the dev server in a docker container running on the imdb-scrape docker network.  
this gives it access to the other containers that are required for it to function properly
this docker container mirrors what is in this folder's working directory via a "bind mount"


issues:
theres some issue with react proxying to 3001 | RESOLVED: apparently when i named the server container, i needed to begin referring to it by its name rather than localhost.  by updating the proxy setting in package.json from localhost -> imdb-server-db, the problem was fixed
