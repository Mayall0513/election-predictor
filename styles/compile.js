const sass = require('sass');
const path = require('path');
const fs   = require('fs');

const result = sass.compile(path.join(__dirname, 'global.scss'));
fs.writeFileSync(path.join(__dirname, 'global.css'), result.css);