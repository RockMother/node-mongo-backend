const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const configPath = path.join(__dirname, '../', '.env');
const devConfigPath = path.join(__dirname, '../', '.env.development');
let envConfig = dotenv.parse(fs.existsSync(configPath) ? fs.readFileSync(configPath) : fs.readFileSync(devConfigPath)); // ;)
for (var k in envConfig) { 
    process.env[k] = envConfig[k]
}