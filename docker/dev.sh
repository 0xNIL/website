#!/usr/bin/env bash

source docker/.default.env && docker run -it --rm \
  --name 0xNIL-dev \
  --link 0xNIL-redis:redis \
  -p 9092 \
  -v $PWD:/usr/src/app \
  -v $PWD/log:/var/log/0xNIL \
  -e NODE_ENV=development \
  -e VIRTUAL_HOST=0xnil.com.localhost \
  -w /usr/src/app node:carbon npm run start
