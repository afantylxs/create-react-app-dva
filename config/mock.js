const fs = require('fs');
const path = require('path');
const mockPath = path.join(__dirname + '/../mock' );
const mockData = {};

// 自动挂载 mock文件夹下所有文件
fs.readdirSync(mockPath).forEach(file => {
  Object.assign(mockData, require('../mock/' + file));
});

// 中间件 在req中添加req.body
function parseDataToBody(req, res, next) {
  req.on('data', function(data) {
    req.body = JSON.parse(data.toString('utf8'));
    next();
  });
}

function Mock(app) {
  const mockKeys = Object.keys(mockData);
  mockKeys.forEach(item => {
    const method = item.split(' ');
    // 判断请求方式，默认POST
    if (method.length > 1) {
      app[method[0].toLocaleLowerCase()](`/funwork-admin/${method[1]}`, parseDataToBody, mockData[item]);
    } else {
      app.post(`/funwork-admin/${item}`, parseDataToBody, mockData[item]);
    }
  });
}

module.exports = Mock;

