#!/usr/bin/env bash

echo "[Publish] Start..."

node ./scripts/generateReadMe.js;

version=`cat ./version.tmp`;
tag="v${version}";

rm -f ./version.tmp;

echo "1.[Dist] generate dist...";
rm -rf dist;
npm run dist;

echo "2.[Package] Git commit package...";
git pull;
git add -A;
git commit -m "publish new version: ${tag}";
git push;

echo "3.[NPM] NPM publish new version: ${tag}";
git tag ${tag};
git push origin ${tag};

echo "4.[Package] Generate github page new version: ${tag}";
npm run vendor;
npm run pages;
cp builds tmp/ -r && git checkout master;


rm -rf builds/;
cp tmp/builds . -r;
rm -rf tmp;

git pull;
git add -A;
git commit -m "update pages(master) new version: ${tag}";
git push;

echo "5.[Package] Back to src branch: subject new version: ${tag}";
git checkout subject;
npm run vendor;
npm restart;

echo "6.[Publish] new version: ${tag}: Finished!"
