#!/usr/bin/env bash

BLUE_COLOR='\E[1;34m'
RES='\E[0m'
echo "----------------------------------------------"
echo -e "[Publish] Start..."

node ./scripts/generateReadMe.js;

echo "------------------- 1 ------------------------"
echo -e "[Dist] get version...";
version=`cat ./version.tmp`;
tag="v${version}";

rm -f ./version.tmp;

echo "------------------- 2 ------------------------"
echo -e "[Dist] cp to dist...";
rm -rf dist;
npm run dist;

echo "------------------- 3 ------------------------"
echo -e "[Package] pull from SUBJECT...";
git pull;
git add -A;
echo "------------------- 4 ------------------------"
echo -e "[Package] push into SUBJECT...";
git commit -m "publish new version: ${tag}";
git push;

echo "------------------- 5 ------------------------"
echo -e "[NPM] push tag to github...";
git tag ${tag};
git push origin ${tag};

echo "------------------- 6 ------------------------"
echo -e "[Package] run vendor && pages: ${tag}";
npm run vendor;
npm run pages;
echo "------------------- 7 ------------------------"
echo -e "[Package] copy to tmp from builds...";
cp builds tmp/ -r

echo "------------------- 8 ------------------------"
echo -e "[Github] checkout to master...";
git checkout master;

echo "------------------- 9 ------------------------"
echo -e "[Package] copy to builds from tmp...";
rm -rf builds/;
cp tmp/ builds -r;


git pull;
git add -A;
git commit -m "update pages(master) new version: ${tag}";
git push;

echo "------------------- 10 ------------------------"
echo -e "[Package] checkout to subject...";
git checkout subject && rm -rf tmp;
npm run vendor;
npm restart;

echo "------------------- 11 ------------------------"
echo -e "[Publish] new version: ${tag}: Finished!"
