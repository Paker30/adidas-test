const { version } = require('../../package.json');

module.exports = {
  name: 'health-check',
  version: '1.1.1',
};

module.exports.register = async (server) => {
  server.route({
    method: 'GET',
    path: '/health-check',
    handler: () => version,
  });
};
