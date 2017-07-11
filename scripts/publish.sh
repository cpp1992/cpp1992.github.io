#!/usr/bin/env bash
BLUE_COLOR='\E[1;34m'
RES='\E[0m'
echo "----------------------------------------------"
echo -e "${BLUE_COLOR}[Publish] Start...${RES}"

node ./scripts/generateReadMe.js;

echo "------------------- 1 ------------------------"
echo -e "${BLUE_COLOR}[Dist] get version...${RES}";
version=`cat ./version.tmp`;
tag="v${version}";

rm -f ./version.tmp;

echo "------------------- 2 ------------------------"
echo -e "${BLUE_COLOR}[Dist] cp to dist...${RES}";
rm -rf dist;
npm run dist;

echo "------------------- 3 ------------------------"
echo -e "${BLUE_COLOR}[Package] pull from SUBJECT...${RES}";
git pull;
git add -A;
echo "------------------- 4 ------------------------"
echo -e "${BLUE_COLOR}[Package] push into SUBJECT...${RES}";
git commit -m "publish new version: ${tag}";
git push;

echo "------------------- 5 ------------------------"
echo -e "${BLUE_COLOR}[NPM] push tag to github...${RES}";
git tag ${tag};
git push origin ${tag};

echo "------------------- 6 ------------------------"
echo -e "${BLUE_COLOR}[Package] run vendor && pages: ${tag}${RES}";
npm run vendor;
npm run pages;
echo "------------------- 7 ------------------------"
echo -e "${BLUE_COLOR}[Package] copy to tmp from builds...${RES}";
cp builds tmp/ -r

echo "------------------- 8 ------------------------"
echo -e "${BLUE_COLOR}[Github] checkout to master...${RES}";
git checkout master;

echo "------------------- 9 ------------------------"
echo -e "${BLUE_COLOR}[Package] copy to builds from tmp...${RES}";
rm -rf builds/;
cp tmp/ builds -r;


git pull;
git add -A;
git commit -m "update pages(master) new version: ${tag}${RES}";
git push;

echo "------------------- 10 ------------------------"
echo -e "${BLUE_COLOR}[Package] checkout to subject...${RES}";
git checkout subject && rm -rf tmp;
npm run vendor;
npm restart;

echo "------------------- 11 ------------------------"
echo -e "${BLUE_COLOR}[Publish] new version: ${tag}: Finished!${RES}"
