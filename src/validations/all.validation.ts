import Joi from 'joi';
import { join } from 'path/posix';

const createUser = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  }),
};

const createProperty = {
  body: Joi.object().keys({
    name: Joi.string().optional(),
    address: Joi.string().optional(),
    type: Joi.string().optional(),
    description: Joi.string().optional(),
    total_rooms: Joi.string().optional(),
    occupancy_type: Joi.string().optional(),
    rent_amount: Joi.string().optional(),
    currency: Joi.string().optional(),
    rent_frequency: Joi.string().optional(),
    is_published: Joi.boolean().optional(),
  }),
  file: Joi.object().keys({
    image: Joi.string().optional(),
  }),
};

const updateProperty = {
  body: Joi.object().keys({
    name: Joi.string().optional(),
    address: Joi.string().optional(),
    type: Joi.string().optional(),
    description: Joi.string().optional(),
    total_rooms: Joi.string().optional(),
    occupancy_type: Joi.string().optional(),
    rent_amount: Joi.string().optional(),
    currency: Joi.string().optional(),
    rent_frequency: Joi.string().optional(),
    is_published: Joi.boolean().optional(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    phone: Joi.string().required(),
  }),
};

export { createUser, login, createProperty };
