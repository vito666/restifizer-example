'use strict';

const mongoose = require('../../config/mongoose');

const modelName = 'Pet';

const _ = require('lodash');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
    enum: ['dog', 'cat'],
  },
});

module.exports = mongoose.model(modelName, schema);