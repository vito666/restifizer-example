'use strict'; 

const Pet = require('../models/pet.server.model');
const BaseController = require('./base.controller');

class PetController extends BaseController {
  constructor(options = {}) {
    Object.assign(options, {
      dataSource: {
        type: 'mongoose',
        options: {
          model: Pet,
        },
      },
      path: '/api/pets',
      fields: [
        'name',
        'species',
      ],
      actions: {
        default: BaseController.createAction({
          auth: ['bearer'],
        }),
      },
    });
    super(options);
  }
}

module.exports = PetController;
