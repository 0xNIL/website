#!/usr/bin/env bash

# it is better and safer to use docker-proxy.sh

docker stop proxy
docker rm proxy

docker stop proxy-companion
docker rm proxy-companion

docker run -d \
  --name proxy \
  -p 80:80/tcp \
  --restart unless-stopped \
  --expose 443/tcp \
  --expose 80/tcp \
  -v /vol/certs:/etc/nginx/certs:ro \
  -v /etc/nginx/vhost.d \
  -v /usr/share/nginx/html \
  -v /var/run/docker.sock:/tmp/docker.sock:ro \
  --label com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy \
  --entrypoint "/app/docker-entrypoint.sh" \
  jwilder/nginx-proxy forego start -r

docker run -d \
  --name proxy-companion \
  -v /vol/certs:/etc/nginx/certs:rw \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  --volumes-from proxy \
  jrcs/letsencrypt-nginx-proxy-companion