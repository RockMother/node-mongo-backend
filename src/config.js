const fs = require('fs');
const dotenv = require('dotenv');
let envConfig = dotenv.parse(fs.exists('.env.development')? fs.readFileSync('.env.development'): fs.readFileSync('.env'));
for (var k in envConfig) {
    process.env[k] = envConfig[k]
}