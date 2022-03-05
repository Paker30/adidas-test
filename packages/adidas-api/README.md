# adidas-api

This module has the API to handle subscriptions in the test, it has 4 endpoints

- */subscriptions*: it returns all the available subscriptions
- */subscriptions/id/:id*: it returns a subscription
- */subscriptions/*: it creates a subscription
- */subscriptions/id/:id*: it cancels a subscription

## Subscription's model

A subscription has the next fields:

- *id*: subscription's unique identifier -it's provided by the system-
- *email*: customer's email -it could be optional-
- *firstName*: customer's first name -it could be optional-
- *gender*: customer's gender
- *dateOfBirth*: customer's date of birth
- *consent*: customer has agreed on receiving emails
- *newsletterId*: type of newsletter is send to the customer
- *active*: subscription is active or inactive

## Start

To start the module you need to install

```sh
npm i
```

and run it with a role -by default works as selector.

```sh
node src/index.js
```

## Environment variables

| name| default value| description|
|-----|--------------|------------|
|PORT| ```8000```| Port in which the API is listening|
|MONGO_URL|```mongodb://localhost:27017/adidas0```|Uri to reach the mongo server|
