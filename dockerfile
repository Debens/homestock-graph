# Install dependencies
FROM node:10-alpine AS dev

WORKDIR /usr/src/app
COPY package.json yarn.lock ./

EXPOSE 4000

RUN yarn

# Build dist
FROM dev AS build

COPY src src/
COPY tsconfig.* ./

RUN yarn build

# Run js
FROM dev AS prod

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

# prune dev dependencies
RUN yarn 

COPY --from=build /usr/src/app/dist dist/
COPY ormconfig.js ./

CMD yarn start:prod