'use strict';

const _ = require('lodash');
const chakram = require('chakram');

const config = require('../config');
const specHelper = require('../spec-helper');

const expect = chakram.expect;

describe("Pet profile", () => {
  const user = specHelper.getFixture(specHelper.FIXTURE_TYPES.USER);
  
//  const pet = specHelper.getFixture(specHelper.FIXTURE_TYPES.USER);

  describe('POST /pets', () => {
    let response;

    before('send post', () => chakram
      .post(`${config.baseUrl}/api/pets`)
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
      .get(`${config.baseUrl}/api/pets/me`)
      .then((result) => {
        response = result;
      }));

    it('should return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('should be the same _id', () => {
      expect(response).to.have.json('_id', pet._id);
    });

    it('should be the same username', () => {
      expect(response).to.have.json('name', pet.name);
    });
  });

  describe('PATCH /pets', () => {
    it('Should create new pet', () => {
      const NEW_VALUE = 'new-username';

      let response;

      before('send request', () => chakram
        .patch(`${config.baseUrl}/api/pets/me`, {
          name: NEW_VALUE,
        }, {
          headers: {
            Authorization: `Bearer ${user.auth.access_token}`,
          },
        })
        .then((result) => {
          response = result;
        }));

      it('should return status 200', () => {
        expect(response).to.have.status(200);
      });

      it('should change username', () => {
        expect(response).to.have.json('name', NEW_VALUE);
      });
    });
  });

  describe('DELETE /pets', () => {
    let response;

    before('send request', () => chakram
      .delete(`${config.baseUrl}/api/pets/me`)
      .then((result) => {
        response = result;
      }));

    it('should return status 204', () => {
      expect(response).to.have.status(204);
    });
  });

})
