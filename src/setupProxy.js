const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/derivatives',
        createProxyMiddleware({
            target: 'https://api.glassnode.com/v1/metrics/',
            changeOrigin: true,
        })
    );
    app.use(
        '/supply',
        createProxyMiddleware({
            target: 'https://api.glassnode.com/v1/metrics/',
            changeOrigin: true,
        })
    );
    app.use(
        '/market',
        createProxyMiddleware({
            target: 'https://api.glassnode.com/v1/metrics/',
            changeOrigin: true,
        })
    );
    app.use(
        '/transactions',
        createProxyMiddleware({
            target: 'https://api.glassnode.com/v1/metrics/',
            changeOrigin: true,
        })
    );
    app.use(
        '/entities',
        createProxyMiddleware({
            target: 'https://api.glassnode.com/v1/metrics/',
            changeOrigin: true,
        })
    );
    app.use(
        '/indicators',
        createProxyMiddleware({
            target: 'https://api.glassnode.com/v1/metrics/',
            changeOrigin: true,
        })
    );
    app.use(
        '/distribution',
        createProxyMiddleware({
            target: 'https://api.glassnode.com/v1/metrics/',
            changeOrigin: true,
        })
    );
    app.use(
        'fees',
        createProxyMiddleware({
            target: 'https://api.glassnode.com/v1/metrics/',
            changeOrigin: true,
        })
    );
    app.use(
        'signals',
        createProxyMiddleware({
            target: 'https://api.glassnode.com/v1/metrics/',
            changeOrigin: true,
        })
    );
    app.use(
        'addresses',
        createProxyMiddleware({
            target: 'https://api.glassnode.com/v1/metrics/',
            changeOrigin: true,
        })
    );
    app.use(
        'mining',
        createProxyMiddleware({
            target: 'https://api.glassnode.com/v1/metrics/',
            changeOrigin: true,
        })
    );
};