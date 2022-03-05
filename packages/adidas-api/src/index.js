const Glue = require('@hapi/glue');
const { PORT } = require('./config/env');

const manifest = {
  server: {
    address: '0.0.0.0',
    port: PORT,
  },
  register: {
    plugins: [
      './api/health-check',
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
