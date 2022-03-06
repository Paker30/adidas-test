module.exports = {
  mqtt: {
    uri: process.env.MQTT_URI || 'tcp://localhost:1883',
    role: (process.env.ROLE || 'selector').trim().toLocaleLowerCase(),
    topics: {
      selector: (process.env.MQTT_SUBSCRIPTIONS || 'subscriptions').trim().toLowerCase(),
      process: (process.env.MQTT_PROCESS || 'process').trim().toLowerCase(),
      notify: (process.env.MQTT_NOTIFY || 'email').trim().toLowerCase(),
    },
  },
  apiUri: process.env.ADIDAS_API || 'http://localhost:8000',
};
