const Glue = require('@hapi/glue');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const HapiMongoDB = require('hapi-mongodb');
const { PORT, mongodb } = require('./config/env');

const { version } = require('../package.json');

const swaggerOptions = {
  info: {
    title: 'Adidas test API',
    version,
  },
};

const manifest = {
  server: {
    address: '0.0.0.0',
    port: PORT,
  },
  register: {
    plugins: [
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      },
      {
        plugin: HapiMongoDB,
        options: mongodb,
      },
      './api/health-check',
      './api/subscriptions',
    ],
  },
};

const options = {
  relativeTo: __dirname,
};

const startServer = async () => {
  try {
    const server = await Glue.compose(manifest, options);
    await server.start();
    console.log('hapi days!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
