FROM node:13 AS builder

ARG BACKEND_URL
ARG GQL_SERVER_URL
ARG GIT_HEAD
RUN GIT_HEAD=$GIT_HEAD

WORKDIR /app

COPY ./ /app

RUN npm install -g yarn --force
RUN yarn install
RUN yarn build

FROM node:13

WORKDIR /app

COPY --from=builder /app/__sapper__ /app/__sapper__
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/static /app/static

CMD [ "node", "__sapper__/build" ]
