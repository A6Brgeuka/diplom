var nconf = require('nconf');
var path = require('path');

nconf.argv()  // �� cmd
    .env()  //�� ���������� ���������
    .file({ file: path.join(__dirname, 'config.json') }); //������ ������ ������������

module.exports = nconf;