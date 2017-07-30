#!/usr/bin/env bash

docker run \
  --name 0xnil \
  -p 9092 \
  -e VIRTUAL_HOST=0xnil.com,www.0xnil.com,0xnil.org,www.0xnil.org,oxnil.org,www.oxnil.org \
  -d 0xnil
