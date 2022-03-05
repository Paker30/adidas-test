const { request, notification } = require('adidas-schemas');
const Axios = require('axios');
const { mqtt, apiUri } = require('./config/env');

const discard = (client) => (_, payload) => {
  let message;
  try {
    message = JSON.parse(payload.toString());
  } catch (error) {
    message = {};
  }

  const { error } = request.validate(message);

  if (!error) {
    client.publish(mqtt.topics.process, JSON.stringify(message))
      .catch(() => {
        console.error('Message could not be published', message);
      });
  }
};

const process = (client) => (_, payload) => {
  let message;
  try {
    message = JSON.parse(payload.toString());
  } catch (error) {
    message = {};
  }

  const { error } = request.validate(message);

  if (!error) {
    Axios.get(`${apiUri}/subscriptions/id/${message.id}`)
      // eslint-disable-next-line consistent-return
      .then(({ data: [{ active, consent, email, newsletterId }] }) => {
        if (active && consent && email) {
          return client.publish(mqtt.topics.notify, JSON.stringify({ email, newsletterId }));
        }
      })
      .catch(() => {
        console.error('Message could not be processed', message);
      });
  }
};

const notify = () => (_, payload) => {
  let message;
  try {
    message = JSON.parse(payload.toString());
  } catch (error) {
    message = {};
  }

  const { error } = notification.validate(message);

  if (!error) {
    console.log(`Send email to ${message.email} with newsletter ${message.newsletterId}`);
  }
};

const pickAction = (role) => {
  switch (role) {
    case 'selector':
      return {
        action: discard,
        topic: mqtt.topics.selector,
      };
    case 'processor':
      return {
        action: process,
        topic: mqtt.topics.process,
      };
    case 'notifier':
      return {
        action: notify,
        topic: mqtt.topics.notify,
      };
    default:
      return {
        action: discard,
        topic: mqtt.topics.selector,
      };
  }
};

module.exports = {
  discard,
  pickAction,
};
