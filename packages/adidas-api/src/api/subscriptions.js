const { subscription, id } = require('adidas-schemas');
const toSubscription = (subscription) => ({ ...subscription, id: subscription._id });

module.exports = {
  name: 'subscriptions',
  version: '1.1.1',
};

module.exports.register = async (server) => {
  server.route({
    method: 'GET',
    path: '/subscriptions',
    options:{
      description: 'Get all subscriptions',
      tags: ['api'],
    },
    handler: (request) => {
      const { db } = request.mongo;

      return db.collection('subscriptions').find({}).toArray()
        .then((subscriptions) => subscriptions.map(toSubscription));
    },
  });

  server.route({
    method: 'GET',
    path: '/subscriptions/id/{id}',
    options: {
      description: 'Get subscriptions by id',
      tags: ['api'],
      validate: {
        params: id
      }
    },
    handler: (request) => {
      const { db, ObjectID } = request.mongo;
      const { id } = request.params;

      return db.collection('subscriptions').find({ _id: new ObjectID(id) }).toArray()
        .then((subscription) => {
          return subscription.map(toSubscription);
        });
    },
  });

  server.route({
    method: 'POST',
    path: '/subscriptions',
    options: {
      description: 'Create a subscription',
      tags: ['api'],
      validate: {
        payload: subscription
      }
    },
    handler: (request) => {
      const { db } = request.mongo;
      const subscription = request.payload;

      return db.collection('subscriptions').insert({ ...subscription, active: true })
        .then(({ insertedIds }) => ({ id: insertedIds[0] }));
    },
  });

  server.route({
    method: 'DELETE',
    path: '/subscriptions/id/{id}',
    options: {
      description: 'Cancel a subscription',
      tags: ['api'],
      validate: {
        params: id
      }
    },
    handler: (request) => {
      const { db, ObjectID } = request.mongo;
      const { id } = request.params;

      return db.collection('subscriptions').findOneAndUpdate({ _id: new ObjectID(id) }, { $set: { active: false } }, { returnOriginal: true })
        .then(({ value }) => ({ id: value._id }));
    },
  });
};
