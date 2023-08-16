const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/derivatives',
        createProxyMiddleware({
            target: 'https://api.glassnode.com/v1/metrics/',
            changeOrigin: true,
        })
    );
};