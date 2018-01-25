#!/usr/bin/env bash

source docker/.default.env && docker run -it --rm \
  --name 0xNIL-debug \
  --link 0xNIL-redis:redis \
  -p 9092 \
  -v $PWD:/usr/src/app \
  -v $PWD/log:/var/log/0xNIL \
  -e NODE_ENV=development \
  -e MAILCHIMP_APIKEY="$MAILCHIMP_APIKEY" \
  -e MAILCHIMP_LISTID="$MAILCHIMP_LISTID" \
  -e VIRTUAL_HOST=felice0 \
  -w /usr/src/app node:6 npm run start
