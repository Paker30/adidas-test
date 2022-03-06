# adidas-test

This is my code version for Adidas' backend test. Those are the main tools I have worked with:

- [HapiJS](https://hapi.dev/) for the API
- [Joi](https://www.npmjs.com/package/joi) for schema validation in the whole system
- [eclipse-mosquitto](https://hub.docker.com/_/eclipse-mosquitto) for the queue system
  - [async-mqtt](https://www.npmjs.com/package/async-mqtt) to connect to mosquitto
- [jest](https://www.npmjs.com/package/jest) for testing
- [MongoDB](https://hub.docker.com/_/mongo) for the database system
- [Lerna](https://github.com/lerna/lerna) to create a monorepo and handle the modules
- [Docker](https://docs.docker.com/) to "dockerize" the software pieces
- [Docker Compose](https://docs.docker.com/compose/) to run the whole system in a "dockerize" environment

## Install and start the project

In order to start the project you need to follow those steps:

1. Download the project ```git clone git@github.com:Paker30/adidas-test.git```
2. Go inside the project folder
3. Install the project ```npm i```
4. Run the boostrap script ```npm run bootstrap```
5. Create the docker images ```npm run build```
6. Up the whole system with docker-compose ```docker-compose up -d```

Everything is up and running, you can check the API is running entering this url in your browser
> ```http://localhost:8000/health-check```
you must get the API's version, also run this command to check all the systems are up and running
> ```docker-compose ps```
You must see 6 services running: api, database, mqtt, notifier, processor and selector

### Handle the API

In order to handle the subscriptions, you should go to the swagger documentation
> ```http://localhost:8000/documentation```
and you'll get a list of all the endpoints, a small description and examples.

### Sending messages into the system to "send" emails

There's no web client to handle MQTT -all the clients I tried weren't available as docker image- so, you must send the messages over the cli tool, eventhough there're two options:
a. You can send messages through [mosquitto_pub](https://mosquitto.org/man/mosquitto_pub-1.html) tool -it's part of the mosquitto system-
> ```mosquitto_pub -h [IP mosquitto] -p [PORT] -t [subscription name] -m [message]```
b. You can send messages through [mqtt](https://www.npmjs.com/package/mqtt) module -it's installed at ```packages/adidas-consumer```-
> ```npx mqtt pub -t [subscription name] -t [PORT] -m '[message]```

If the message was valid, the subscription was active and had an email, a message would arrive to notifier and you would see a message like this
> Send email to [subscription's email] with newsletter [subscription's newsletter id]

#### Format message

A valid message must follow this format

```JSON
{
  "id": "subscripton's id"
}
```

Any message which doesn't fit into this format will be discharged.

## Structure

The application has 3 modules:

- adidas-api
- adidas-consumer
- adidas-schemas

Each module has a specif purpose and they might be related in order to accomplish the goal, each module has its own readme in case you want to know more specific details.

## Unrelated topics

As you can see, not all the code is tested, the reason is I didn't have more time so I decided to test at least a module to show how -I think- the whole application should be tested; it's a petty I didn't cover the API and the schemas.

About security, to be honest I'm not so sure what could be done in the code, it's true the API should have an environment variable to retrieve certifications in order to connect to the database -I'm not sure how to securize a connection any queue connection -with MQTT it's the first time I've worked with it- This system should be deployed at a private network -even the API-, I deploy a gateway in which I would take care of authentication, amount of request by IP and other issues like that.

There's no pipeline proposal but if there had been one, it would have placed at the root folder and taken care of module, each time a new version would be created, a new image would be created and deployed.

Any doubt or question you might have, please get no doubt and get in touch with the author [Francisco Moreno](morenocfrancisco86@gmail.com) -it's me :rofl:-
