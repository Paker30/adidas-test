const MQTT = require('async-mqtt');
const { mqtt } = require('./config/env');
const { select } = require('./actions');

const client = MQTT.connect(mqtt.uri);
const { action, topic } = select(mqtt.role);
client.on('connect', () => {
  console.log('successful connection!!!');
  client.subscribe([topic], {})
    .then(() => {
      console.log(`subscription to: ${topic}`);
    });
});

client.on('message', action(client));
client.on('close', () => {
  console.log('disconnected');
});
