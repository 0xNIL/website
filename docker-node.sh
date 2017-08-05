#!/usr/bin/env bash

docker stop 0xNIL-web
docker rm 0xNIL-web

docker run -d \
  --name 0xNIL-web \
  --link 0xNIL-redis:redis \
  -p 9092 \
  -v $PWD:/usr/src/app \
  -v /vol/log/0xNIL:/var/log/0xNIL \
  -e VIRTUAL_HOST=0xnil.com,www.0xnil.com,0xnil.org,www.0xnil.org,oxnil.org,www.oxnil.org,oxnil.com,www.oxnil.com \
  -w /usr/src/app node:6 npm run start
