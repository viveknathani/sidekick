'use strict';

const URI_GRADES     = `http://localhost:${process.env.ATTENDANCE_PORT}/api/v1`;
const { createProxyMiddleware } =  require('http-proxy-middleware');

const attendanceProxyOptions = {
    target: URI_GRADES,
    changeOrigin: true,
    ws: true,
    logLevel: 'debug',
    pathRewrite: {
        '^/attendance/': '/'
    }
}

const attendanceProxy = createProxyMiddleware(attendanceProxyOptions);

module.exports = function(app)
{
    app.use('/attendance', attendanceProxy);
}