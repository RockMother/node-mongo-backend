const fs = require('fs');
const dotenv = require('dotenv');
console.log(fs.exists('.env.development')); //undefined :O
let envConfig = dotenv.parse(fs.exists('.env.development') ? fs.readFileSync('.env') : fs.readFileSync('.env.development')); // ;)
for (var k in envConfig) {
    process.env[k] = envConfig[k]
}