FROM node:18.0-alpine3.14 as build-stage

ENV DATABASE_URL=file:./dev.db

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run migrate:dev

RUN npm run prisma:generate

RUN npm run build

# production stage
FROM node:18.0-alpine3.14 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm run migrate:dev

RUN npm run prisma:generate

RUN npm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]
