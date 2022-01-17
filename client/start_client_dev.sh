docker run -dp 3000:3000 \
    -w /client -v "$(pwd):/client" \
    --name imdb-client-dev \
    --network imdb-scrape \
    node:12-alpine \
    sh -c "npm install && npm start"
