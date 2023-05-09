FROM node:12-alpine

WORKDIR /server
COPY . /server
RUN npm install

EXPOSE 3001

CMD ["npm", "run", "start"]
