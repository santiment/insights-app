FROM node:13 AS builder

ARG BACKEND_URL
ARG API_FETCH_ORIGIN
ARG GQL_SERVER_URL
ARG GIT_HEAD
RUN GIT_HEAD=$GIT_HEAD

WORKDIR /app

COPY ./ /app

RUN npm install --unsafe-perm
RUN npm run build

FROM node:13

WORKDIR /app

COPY --from=builder /app/__sapper__ /app/__sapper__
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/static /app/static

CMD [ "node", "__sapper__/build" ]
