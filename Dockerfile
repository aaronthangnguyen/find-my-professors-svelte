FROM node:16-alpine AS build

WORKDIR /app

COPY rollup.config.js ./
COPY package*.json ./
COPY .env ./
RUN source .env

RUN npm install

COPY ./src ./src
COPY ./public ./public

CMD ["npm" ,"start"]
