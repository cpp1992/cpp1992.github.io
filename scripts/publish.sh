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
npm run pages;
rm -rf tmp/builds;
cp builds/ tmp/ -r;
git checkout master;
rm -rf builds/;
cp tmp/builds . -r;

git pull;
git add -A;
git commit -m "update pages(master) new version: ${tag}";
git push;
rm -rf tmp/;
echo "[Package] Back to src branch: subject new version: ${tag}";
git checkout subject;
rm -rf tmp/;
npm run vendor;
npm restart;

echo "[Publish] new version: ${tag}: Finished!"
