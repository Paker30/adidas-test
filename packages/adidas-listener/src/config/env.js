module.exports = {
  mqtt: {
    uri: process.env.MQTT_URI || 'tcp://localhost:1883',
    role: process.env.ROlE || 'selector',
    topics: {
      selector: process.env.MQTT_SUBSCRIPTIONS || 'subscriptions',
      process: process.env.MQTT_PROCESS || 'process',
      notify: process.env.MQTT_NOTIFY || 'email',
    },
  },
  apiUri: process.env.ADIDAS_API || 'http://localhost:8000',
};
