import * as dynamo from 'dynamodb';
const Joi = require('joi');
export const Categories = dynamo.define('Categories', {
    hashKey: 'id',
    timestamps: true,
    schema: {
        id: Joi.string(),
        name: Joi.string(),
    },
})