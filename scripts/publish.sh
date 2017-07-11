#!/usr/bin/env bash
BLUE_COLOR='\E[1;34m'
echo "----------------------------------------------"
echo -e  "${BLUE_COLOR}[Publish] Start...${RES}"

node ./scripts/generateReadMe.js;

echo "------------------- 1 ------------------------"
echo "[Dist] get version...";
version=`cat ./version.tmp`;
tag="v${version}";

rm -f ./version.tmp;

echo "------------------- 2 ------------------------"
echo "[Dist] cp to dist...";
rm -rf dist;
npm run dist;

echo "------------------- 3 ------------------------"
echo "[Package] pull from SUBJECT...";
git pull;
git add -A;
echo "------------------- 4 ------------------------"
echo "[Package] push into SUBJECT...";
git commit -m "publish new version: ${tag}";
git push;

echo "------------------- 5 ------------------------"
echo "[NPM] publish to NPM registry...";
git tag ${tag};
git push origin ${tag};

echo "[Package] Generate github page new version: ${tag}";
npm run vendor;
npm run pages;
cp builds tmp/ -r && git checkout master;


rm -rf builds/;
cp tmp/ builds -r;


git pull;
git add -A;
git commit -m "update pages(master) new version: ${tag}";
git push;

echo "[Package] Back to src branch: subject new version: ${tag}";
git checkout subject && rm -rf tmp;
npm run vendor;
npm restart;

echo "[Publish] new version: ${tag}: Finished!"
