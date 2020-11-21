'use strict';

const URI_EXPENSES              = `http://localhost:${process.env.EXPENSES_PORT}/api/v1`;
const { createProxyMiddleware } =  require('http-proxy-middleware');

const expensesProxyOptions = {
    target: URI_EXPENSES,
    changeOrigin: true,
    ws: true,
    logLevel: 'debug',
    pathRewrite: {
        '^/expenses/': '/'
    }
}

const expensesProxy = createProxyMiddleware(expensesProxyOptions);

module.exports = function(app)
{
    app.use('/expenses', expensesProxy);
}