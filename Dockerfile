FROM node:lts-alpine as build-stage

ENV DATABASE_URL=file:./dev.db

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run migrate:dev

RUN npm run prisma:generate

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
