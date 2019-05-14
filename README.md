# homestock-graph &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![CircleCI](https://circleci.com/gh/Debens/homestock-graph.svg?style=shield&circle-token=d37cf7fc475b7c8c8ba0aadd00205106dcd11ae6)](https://circleci.com/gh/Debens/homestock-graph)

GraphQL gateway API for accessing [Homestock](https://github.com/Debens/homestock) 📦 model

```sh
docker pull debens/homestock-graph

docker run  -p 4000:4000 --env-file=.env --name=homestock-graph  debens/homestock-graph
```

See `.env.exmaple` for environment variable.

## Running

```sh
yarn
yarn build
yarn start
```

## Devlopment

```sh
yarn compose
```
