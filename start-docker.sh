#!/usr/bin/env bash

docker run \
  --name oxnil \
  -p 9092 \
  -e VIRTUAL_HOST=0xnil.com,www.0xnil.com,0xnil.org,www.0xnil.org \
  -d oxnil
