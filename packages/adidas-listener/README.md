# adidas-listener

This module has the listener used at the test, depending on the role, the module works in different ways. It is a [mqtt]() listener.

## Start

To start the module you need to install

```sh
npm i
```

and run it with a role -by default works as selector.

```sh
node src/index.js
```

## Roles

There're 3 different roles:

- *selector*: Takes the messages from the queue -by default subscriptions- and checks its format, only those which are valid are sended to the process queue, the rest are discharged.
- *processor*: Takes the messages form the queue -by default process- and checks if the subscription is active, the user has aggred to received emails and there's an email address, in that case a message is send to the notify queue, otherwise the message is discharged.
- *notifier*: Takes the message from the queue -by default email- and "sends" an email with the selected subscription's newsletter.

## Message format

A notification message must have this format -any message which doesn't full fill the format is discharged-

```json
{
  id: 'subscription identifier'
}
```

## Notify to a customer

This is the way to send a notification

```sh
mosquitto_pub -h localhost -p 1883 -t "subscriptions" -m "{\"id\":\"62237e0f2ad6b25690243bae\"}"
```

## Environment variables

| name| default value| description|
|-----|--------------|------------|
|MQTT_URI| ```tcp://localhost:1883```| MQTT uri to connect|
|ROLE| ```selector```| Which configuration the consumer is started, there're 3 different roles|
|MQTT_SUBSCRIPTIONS|```subscriptions```| Queue to send the messages to start a notification process|
|MQTT_PROCESS|```process```| Queue to send those notification messages which are valid|
|MQTT_NOTIFY|```email```| Queue to send the email and newsletter id in order to notified a customer|
|ADIDAS_API|```http://localhost:8000```|Uri to reach adidas-api|
