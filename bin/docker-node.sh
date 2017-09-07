#!/usr/bin/env bash

docker stop 0xNIL-web
docker rm 0xNIL-web

source bin/.default.env && docker run -d \
  --name 0xNIL-web \
  --link 0xNIL-redis:redis \
  -p 9092 \
  --restart unless-stopped \
  -v $PWD:/usr/src/app \
  -v /vol/log/0xNIL:/var/log/0xNIL \
  -e NO_REPLY_PWD="$NO_REPLY_PWD" \
  -e MAILCHIMP_APIKEY="$MAILCHIMP_APIKEY" \
  -e MAILCHIMP_LISTID="$MAILCHIMP_LISTID" \
  -e VIRTUAL_HOST=0xnil.com,www.0xnil.com,0xnil.org,www.0xnil.org,oxnil.org,www.oxnil.org,oxnil.com,www.oxnil.com \
  -e LETSENCRYPT_HOST=0xnil.org \
  -e LETSENCRYPT_EMAIL=admin@0xnil.org \
  -w /usr/src/app node:6 npm run start