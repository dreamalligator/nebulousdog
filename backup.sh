#!/usr/bin/env bash

echo 'backing up digitalocean droplet!'

if [ -z "$DIGITALOCEAN_TOKEN" ] || [ -z "$DROPLET_ID" ]; then
  echo 'couldnt find DIGITALOCEAN_TOKEN or DROPLET_ID in TOKENS file. aborting.'
  exit 1
fi

curl -X POST -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer '$DIGITALOCEAN_TOKEN'' \
    -d '{"type":"snapshot","name":"catcobralizard backup snapshot"}' \
    'https://api.digitalocean.com/v2/droplets/'$DROPLET_ID'/actions'
