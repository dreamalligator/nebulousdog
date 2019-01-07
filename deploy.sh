#!/usr/bin/env bash

echo 'deploying!'

source TOKENS

if [ -z "$DIGITALOCEAN_TOKEN" ]; then
  echo "token blank, retrieve your token from digitalocean..."
  firefox https://cloud.digitalocean.com/account/api/tokens
  read -p 'token: ' DIGITALOCEAN_TOKEN
  echo 'deploying ghost droplet to digital ocean...'

  curl -X POST -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer '$DIGITALOCEAN_TOKEN'' -d \
    '{"name":"catcobralizard","region":"sfo2","size":"4gb","image":"ghost-18-04"}' \
    "https://api.digitalocean.com/v2/droplets" \
    | grep -Po '"id":.*?[^\\]",' > TOKENS
else
  echo "token found: "$DIGITALOCEAN_TOKEN
fi

if [ -z "$DROPLET_ID" ]; then
  echo "no droplet id saved, retrieving..."

  curl -X GET -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer '$DIGITALOCEAN_TOKEN'' -d \
    '{"name":"catcobralizard"}' \
    "https://api.digitalocean.com/v2/droplets" \
    | grep -Po '"id":.*?[^\\]",' > TOKENS
else
  echo "droplet id found: "$DROPLET_ID
fi

echo "done."
