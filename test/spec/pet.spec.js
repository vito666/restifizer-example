'use strict';

const _ = require('lodash');
const chakram = require('chakram');

const config = require('../config');
const specHelper = require('../spec-helper');

const expect = chakram.expect;

describe("Pet profile",() => {
  const pet = specHelper.getFixture(specHelper.FIXTURE_TYPES.USER);

  describe('POST /pets', () => {
    let response;

    before('send post', () => chakram
           .post(`/pets`) 
           .then((result) => {
      response = result;
    }));

    it('should return status 201', () => expect(response).to.have.status(201));

    it('should contain _id', () => {
      pet._id = response.body._id;
      return expect(response.body._id).to.exist;
    });

    after('sign in user', () => specHelper.signInUser(pet));
  });

  describe('GET /pets', () => {
    let response;

    before('send request', () => chakram
           .get(`${config.baseUrl}/api/pets/me`, {
      headers: {
        Authorization: `Bearer ${pet.auth.access_token}`,
      },
    })
           .then((result) => {
      response = result;
    }));

    it('should return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('should be the same _id', () => {
      expect(response).to.have.json('_id', user._id);
    });

    it('should be the same username', () => {
      expect(response).to.have.json('name', pet.name);
    });
  });

  describe('PATCH /pets', () => {
    it('Should create new pet', () =>{

    }); 
  });

  describe('DELETE /pets', () => {
    it('Should create new pet', () =>{

    }); 
  });

})