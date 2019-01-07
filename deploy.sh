#!/usr/bin/env bash

echo 'deploying!'

if [ -f TOKENS ]; then
  echo "tokens file found, continuing..."
else
  echo "tokens file not found, creating..."
  touch TOKENS
fi

source TOKENS

if [ -z "$DIGITALOCEAN_TOKEN" ]; then
  echo "token blank, retrieve your token from digitalocean..."
  firefox https://cloud.digitalocean.com/account/api/tokens

  read -p 'token: ' DIGITALOCEAN_TOKEN

  echo "DIGITALOCEAN_TOKEN="$DIGITALOCEAN_TOKEN >> TOKENS

  echo 'deploying ghost droplet to digital ocean...'

  curl -X POST -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer '$DIGITALOCEAN_TOKEN'' -d \
    '{"name":"catcobralizard","region":"sfo2","size":"4gb","image":"ghost-18-04"}' \
    "https://api.digitalocean.com/v2/droplets" \
    | python3 -c "import sys, json; print(json.load(sys.stdin)['droplets'][0]['id'])" \
    | read DROPLET_ID

  echo "DROPLET_ID="$DROPLET_ID >> TOKENS
else
  echo "token found: "$DIGITALOCEAN_TOKEN
fi

source TOKENS

if [ -z "$DROPLET_ID" ]; then
  echo "no droplet id saved, retrieving..."

  curl -X GET -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer '$DIGITALOCEAN_TOKEN'' -d \
    '{"name":"catcobralizard"}' \
    "https://api.digitalocean.com/v2/droplets" \
    | python3 -c "import sys, json; print(json.load(sys.stdin)['droplets'][0]['id'])" \
    | read DROPLET_ID

  echo "DROPLET_ID="$DROPLET_ID >> TOKENS
else
  echo "droplet id found: "$DROPLET_ID
fi

echo "done."
