FROM node:12-alpine
# Adding build tools to make yarn install work on Apple silicon / arm64 machines
RUN apk add --no-cache python2 g++ make
WORKDIR /imdb_scrape
COPY . .
RUN npm install
ENV MYSQL_DB=imdb
ENV MYSQL_HOST=mysql
ENV MYSQL_PASSWORD=secret
ENV MYSQL_USER=root
ENV NODE_ENV=production
CMD ["node", "src/index.js"]