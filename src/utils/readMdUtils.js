import fs from 'fs';

export default (fileName) => {
	fs.readFile(`${__dirname}/../../mdfiles/${fileName}.md`, (err, data) => {
		console.log('11111', __dirname);
		console.log('11111', data);
		return data;
	});
};
