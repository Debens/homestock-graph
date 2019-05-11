# Install dependencies
# TODO: dev vs prod
FROM node:10-alpine AS dev

WORKDIR /usr/src/app
COPY package.json yarn.lock ./

EXPOSE 4000

RUN yarn

# Build dist -- PROD only
FROM dev AS build

COPY src src/
COPY tsconfig.json ./

RUN yarn build

# Run js
FROM dev AS prod

COPY --from=build /usr/src/app/dist dist/
COPY ormconfig.js ./

CMD yarn start:prod