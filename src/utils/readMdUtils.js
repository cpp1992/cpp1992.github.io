import fs from 'fs-extra';

export const myMdVersion = 'YouDao';

export const getMD = (fileName) => {
	fs.readFile(`${__dirname}/../../mdfiles/${fileName}.md`, (err, data) => {
		console.log('11111', __dirname);
		console.log('11111', data);
		return data;
	});
};
