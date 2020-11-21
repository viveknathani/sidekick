'use strict';

const fetch          =  require('node-fetch');
const URI_AUTH       = `http://localhost:${process.env.AUTH_PORT}/api/v1`;
const { createProxyMiddleware } =  require('http-proxy-middleware');

const authProxyOptions = {
    target: URI_AUTH,
    changeOrigin: true,
    ws: true,
    logLevel: 'debug',
    pathRewrite: {
        '^/auth/': '/'
    }
}

const authProxy = createProxyMiddleware(authProxyOptions);

module.exports = function(app)
{
    app.use('/auth', authProxy);
}
