var metalsmith = require('metalsmith');
var debug = require('metalsmith-debug');

metalsmith(__dirname)
  .source('./src')
  .destination('./public')
  .use(debug())
  .build(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Website built');
    }
  });
