var nconf = require('nconf');
var path = require('path');

nconf.argv()  // из cmd
    .env()  //из переменных окружения
    .file({ file: path.join(__dirname, 'config.json') }); //откуда читаем конфигурацию

module.exports = nconf;