#!/usr/bin/env bash

host=0xNIL-web

if [[ $1 != '' ]]; then
  host=$1
fi

docker exec -it $host bash
