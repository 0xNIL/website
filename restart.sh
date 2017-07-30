#!/bin/bash

docker stop oxnil
docker rm oxnil
docker rmi oxnil
./build.sh
./start-docker.sh
