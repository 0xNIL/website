#!/bin/bash

docker stop portraits
docker rm portraits
docker rmi portraits
./build.sh
./start-docker.sh
