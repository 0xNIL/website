#!/usr/bin/env bash

source bin/.default.env && docker run -it --rm \
  --name 0xNIL-debug \
  --link 0xNIL-redis:redis \
  -p 9092 \
  -v $PWD:/usr/src/app \
  -v $PWD/log:/var/log/0xNIL \
  -e DEBUG_MODE=true \
  -e MAILCHIMP_APIKEY="$MAILCHIMP_APIKEY" \
  -e MAILCHIMP_LISTID="$MAILCHIMP_LISTID" \
  -e VIRTUAL_HOST=felice0 \
  -w /usr/src/app node:6 npm run start
