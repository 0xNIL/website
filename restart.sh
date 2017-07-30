#!/bin/bash

docker stop 0xnil
docker rm 0xnil
docker rmi 0xnil
./build.sh
./start-docker.sh
