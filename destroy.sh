#!/usr/bin/env bash

echo 'destroying!'

source TOKENS

if [ -z "$DIGITALOCEAN_TOKEN" ] || [ -z "$DROPLET_ID" ]; then
  echo 'couldnt find DIGITALOCEAN_TOKEN or DROPLET_ID in TOKENS file. aborting.'
  exit 1
fi

echo 'destroying droplet '$DROPLET_ID' on digital ocean...'

curl -X DELETE -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer '$DIGITALOCEAN_TOKEN'' -d \
    '{"id":"'$DROPLET_ID'"}' \
    "https://api.digitalocean.com/v2/droplets"
