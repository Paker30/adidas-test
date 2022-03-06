const Joi = require('joi');

const id = Joi.object({
  id: Joi.string().description('subscription\'s id').example('62237e0f2ad6b25690243bae'),
});

const subscription = Joi.object({
  id: Joi.string().description('subscription\'s id').example('62237e0f2ad6b25690243bae'),
  email: Joi.string().email().description('customer\'s email subscription').example('mortadelo@tia.com'),
  firstName: Joi.string().description('customer name').example('mortadelo'),
  gender: Joi.string().required().description('customer\'s gender').example('male'),
  dateOfBirth: Joi.date().required().description('customer\'s gender').example('11-28-1958'),
  consent: Joi.boolean().required().description('send email').example(true),
  newsletterId: Joi.string().description('newsletter id').example('123'),
  active: Joi.bool().default(true).description('subscription active status').example(true),
});

const request = Joi.object({
  id: Joi.string().description('subscription\'s id').example('62237e0f2ad6b25690243bae'),
});

const notification = Joi.object({
  email: Joi.string().email().description('customer\'s email subscription').example('mortadelo@tia.com'),
  newsletterId: Joi.string().description('newsletter id').example('123'),
});

module.exports = {
  subscription,
  id,
  request,
  notification,
};
