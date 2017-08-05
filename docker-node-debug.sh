#!/usr/bin/env bash

docker run -it --rm \
  --name 0xNIL-debug \
  --link 0xNIL-redis:redis \
  -p 9092 \
  -v $PWD:/usr/src/app \
  -v $PWD/log:/var/log/0xNIL \
  -e DEBUG_MODE=true \
  -w /usr/src/app node:6 npm run start