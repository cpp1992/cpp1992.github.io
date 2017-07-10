#!/usr/bin/env bash

echo "[Publish] Start..."

node ./scripts/generateReadMe.js

version=`cat ./version.tmp`
tag="v${version}"

rm -f ./version.tmp

echo "[Dist] generate dist..."
rm -rf dist
npm run dist

echo "[Package] Git commit package..."
git add .
git commit -m "publish new version"
git push
git tag ${tag}
git push origin ${tag}

echo "[NPM] NPM publish..."
npm publish

echo "[Package] Generate github page..."
npm run vendorAll
rm -rf /tmp/builds
mv builds /tmp
git checkout master
rm -rf ./builds
mv /tmp/builds .
git add .
git commit -m "update pages(master)"
git push

echo "[Package] Back to src branch: subject ..."
git checkout subject
npm run vendor
npm restart

echo "[Publish] Finished!"
