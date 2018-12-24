#!/usr/bin/env bash

docker stop 0xNIL-web-debug
docker rm 0xNIL-web-debug

docker stop 0xNIL-web
docker rm 0xNIL-web

source docker/.default.env && docker run -it \
  --name 0xNIL-web-debug \
  --link 0xNIL-redis:redis \
  -p 9092 \
  -v $PWD:/usr/src/app \
  -v /vol/log/0xNIL:/var/log/0xNIL \
  -e VIRTUAL_HOST=oxnil.org,www.oxnil.org,0xnil.org,www.0xnil.org,oxnil.com,www.oxnil.com \
  -e LETSENCRYPT_HOST=0xnil.com,www.0xnil.com \
  -e LETSENCRYPT_EMAIL=info@0xnil.com \
  -w /usr/src/app node:carbon npm run start

