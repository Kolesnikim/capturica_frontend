#!/usr/bin/env bash

set -ex

VERSION=$(date +%Y-%m-%d)
IMGNAME=capturica/webpagefront
REGNAME=registry.dev.mrbot.im
GITBRANCH=$(git rev-parse --abbrev-ref HEAD)

docker build -t ${IMGNAME} .
docker tag $IMGNAME $REGNAME/$IMGNAME:$VERSION-$GITBRANCH
if [[ -n $1 ]]; then
    docker push $REGNAME/$IMGNAME:$VERSION-$GITBRANCH
fi

echo "docker register sync done"
echo "current version is \`docker pull $REGNAME/$IMGNAME:$VERSION-$GITBRANCH\`"

# docker rmi $(docker images -qa -f 'dangling=true')
