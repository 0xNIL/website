#!/usr/bin/env bash

docker run \
  --name 0xNIL-redis \
  -v /vol/data/redis:/data \
  -d redis redis-server --appendonly yes

