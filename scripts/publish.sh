#!/usr/bin/env bash

echo "[Publish] Start..."

node ./scripts/generateReadMe.js;

version=`cat ./version.tmp`;
tag="v${version}";

rm -f ./version.tmp;

echo "[Dist] generate dist...";
rm -rf dist;
npm run dist;

echo "[Package] Git commit package...";
git pull;
git add -A;
git commit -m "publish new version: ${tag}";
git push;

echo "[NPM] NPM publish new version: ${tag}";
git tag ${tag};
git push origin ${tag};

echo "[Package] Generate github page new version: ${tag}";
npm run vendor;
npm run pages;
rm -rf tmp/builds;
cp builds/ tmp/ -r;

git checkout master;


echo "[Publish] new version: ${tag}: Finished!"
