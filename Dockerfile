FROM node:16-alpine AS build

WORKDIR /app

COPY . ./
RUN npm install
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
