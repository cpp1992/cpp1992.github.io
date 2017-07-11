const fs = require('fs');

const packageJson = fs.readFileSync('./package.json', 'utf8');
const version = packageJson.substr(16, 5);
console.log('[Package] Publish version:', version);

console.log('[README] render template...');
let content = fs.readFileSync('./scripts/README.tmpl', 'utf8');
content = content.replace(/\$\{version}/g, version);

fs.writeFileSync('./README.md', content, 'utf8');
console.log('[README] done...');

fs.writeFileSync('./version.tmp', version, 'utf8');
