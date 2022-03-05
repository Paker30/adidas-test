module.exports = {
  name: 'subscriptions',
  version: '1.1.1',
};

module.exports.register = async (server) => {
  server.route({
    method: 'GET',
    path: '/subscriptions',
    handler: (request) => {
      const { db } = request.mongo;

      return db.collection('subscriptions').find({}).toArray();
    },
  });

  server.route({
    method: 'GET',
    path: '/subscriptions/id/{id}',
    handler: (request) => {
      const { db, ObjectID } = request.mongo;
      const { id } = request.params;

      return db.collection('subscriptions').find({ _id: new ObjectID(id) }).toArray();
    },
  });

  server.route({
    method: 'POST',
    path: '/subscriptions',
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
    handler: (request) => {
      const { db, ObjectID } = request.mongo;
      const { id } = request.params;

      return db.collection('subscriptions').findOneAndUpdate({ _id: new ObjectID(id) }, { $set: { active: false } }, { returnOriginal: true})
        .then(({ value }) => ({ id: value._id}));
    },
  });
};
