FROM node:16-alpine AS build

WORKDIR /app

COPY rollup.config.js ./
COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY ./public ./public

RUN npm build

CMD ["npm" ,"start"]
