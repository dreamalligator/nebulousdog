#!/usr/bin/env bash

echo 'deploying!'

echo 'retrieve your token from digitalocean...'
firefox https://cloud.digitalocean.com/account/api/tokens

read -p 'token: ' TOKEN

echo 'deploying ghost droplet to digital ocean...'

curl -X POST -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer '$TOKEN'' -d \
    '{"name":"catcobralizard","region":"sfo2","size":"4gb","image":"ghost-18-04"}' \
    "https://api.digitalocean.com/v2/droplets"
