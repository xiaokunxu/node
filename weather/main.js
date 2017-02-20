var apiName = "http://api.jirengu.com/weather.php";
var http = require('http').get;


http.get(apiName, (res) => {
  const statusCode = res.statusCode;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error(`请求失败。\n` +
                      `状态码: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error(`无效的 content-type.\n` +
                      `期望 application/json 但获取的是 ${contentType}`);
  }
  if (error) {
    console.log(error.message);
    // 消耗响应数据以释放内存
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => {
    try {
      let parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.log(e.message);
    }
  });
}).on('error', (e) => {
  console.log(`错误: ${e.message}`);
});