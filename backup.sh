#!/usr/bin/env bash

echo 'backing up!'

# backs up ghost image, not the digital ocean image
ssh -n root@your_ghost_IP_address 'tar zcvf - -C /var/www/ghost/content/images .' | cat - > ghost_images.tar.gz
