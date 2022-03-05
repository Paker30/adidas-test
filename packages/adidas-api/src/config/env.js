module.exports = {
  PORT: process.env.PORT || 8000,
  mongodb: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/adidas',
    decorate: true,
  },
};
