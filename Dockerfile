FROM node:lts-alpine

WORKDIR /home/node/app

COPY dist .
COPY package*.json ./

RUN chown -R node:node /home/node/app

USER node

EXPOSE 3000

RUN npm install

CMD [ "node", "server.js" ]
