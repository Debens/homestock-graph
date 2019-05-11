# The instructions for second stage
FROM node:10-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

EXPOSE 4000

RUN yarn