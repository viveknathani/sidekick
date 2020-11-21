'use strict';

const URI_GRADES     = `http://localhost:${process.env.GRADES_PORT}/api/v1`;
const { createProxyMiddleware } =  require('http-proxy-middleware');

const gradesProxyOptions = {
    target: URI_GRADES,
    changeOrigin: true,
    ws: true,
    logLevel: 'debug',
    pathRewrite: {
        '^/grades/': '/'
    }
}

const gradesProxy = createProxyMiddleware(gradesProxyOptions);

module.exports = function(app)
{
    app.use('/grades', gradesProxy);
}