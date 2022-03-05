const Joi = require('joi');

const id = Joi.object({
  id: Joi.string().description('subscription\'s id')
});

const subscription = Joi.object({
  id: Joi.string().description('subscription\'s id'),
  email: Joi.string().email().description('user\'s email subscription'),
  firstName: Joi.string().description('user name'),
  gender: Joi.string().required().description('user\'s gender'),
  dateOfBirth: Joi.date().required().description('user\'s gender'),
  consent: Joi.boolean().required().description('send email'),
  newsletterId: Joi.string().description('newsletter id'),
  active: Joi.bool().default(true).description('subscription active status'),
});

const request = Joi.object({
  id: Joi.string().description('subscription\'s id'),
});

const notification = Joi.object({
  email: Joi.string().email().description('user\'s email subscription'),
  newsletterId: Joi.string().description('newsletter id'),
});

module.exports = {
  subscription,
  id,
  request,
  notification,
};
