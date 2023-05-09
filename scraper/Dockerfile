FROM node:12-alpine
# Adding build tools to make yarn install work on Apple silicon / arm64 machines
RUN apk add --no-cache python2 g++ make
WORKDIR /imdb_scrape
COPY . .
RUN npm install

ENV NODE_ENV=production

EXPOSE 3306
CMD ["node", "src/index.js"]
