# [catcobralizard](https://catcobralizard.com)

plants, code, mopeds, maybe some bad art.

## Clone Repo

```
mkdir projects
git clone git@github.com:nebulousdog/catcobralizard.git ~/projects/catcobralizard
cd ~/projects/catcobralizard
```

## Install Deps

install node deps

```bash
yarn
```

## Deploy

deploys a digitalocean ghost droplet  

```bash
bash ./deploy.sh
```

refs:
* https://www.digitalocean.com/docs/one-clicks/ghost/
* https://www.digitalocean.com/community/tutorials/how-to-configure-and-maintain-ghost-from-the-command-line

## Destroy

destroys droplet

```bash
bash ./destroy.sh
```

## Backup

creates a droplet snapshot

```bash
bash ./backup.sh
```

## License

MIT
