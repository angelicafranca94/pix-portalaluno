const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // O prefixo da URL que deseja redirecionar para a API
    createProxyMiddleware({
      target: 'https://localhost:7195', // URL da sua API
      changeOrigin: true,
    })
  );
};
