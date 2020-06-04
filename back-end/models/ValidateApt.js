const Joi = require('@hapi/joi');

const ValidateApt = Joi.object({
  address: Joi.object()
    .required(),
  city: Joi.string(),
  img: Joi.array(),
  user: Joi.string(),
  parking: Joi.boolean(),
  parking: Joi.boolean(),
  balcony: Joi.boolean(),
  pets: Joi.boolean(),
  elevator: Joi.boolean(),
  airConditioner: Joi.boolean(),
  flatmates: Joi.boolean(),
  longterm: Joi.boolean(),
  handicapAccess: Joi.boolean(),
  furnished: Joi.boolean(),
  storage: Joi.boolean(),
  bombShelter: Joi.boolean(),
  frontYard: Joi.boolean(),
  entranceDate: Joi.date(),
  rooms: Joi.number()
    .required(),
  squareMeters: Joi.number()
    .required(),
  price: Joi.number(),
  description: Joi.string(),
  phone: Joi.string()
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'co.il'] } })
      .required(),
})

module.exports = ValidateApt;