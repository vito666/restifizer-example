'use strict';

const _ = require('lodash');
const chakram = require('chakram');

const config = require('../config');
const specHelper = require('../spec-helper');

const expect = chakram.expect;

describe("Pet", () => {
  const user = specHelper.getFixture(specHelper.FIXTURE_TYPES.USER);
  const pet = specHelper.getFixture(specHelper.FIXTURE_TYPES.PET);
  const dog = Object.assign({species: 'dog'}, pet);
  before('Create and sign in User', () => {
    return specHelper.createUser(user)
      .then(() => specHelper.signInUser(user));
  });

  describe('POST /pets', () => {
    let response;

    before('send post', () => chakram
      .post(
        `${config.baseUrl}/api/pets`,
        dog,
        {headers: {Authorization: `Bearer ${user.auth.access_token}`}}
      )
      .then((result) => {
        response = result;
      }));

    it('should return status 201', () => expect(response).to.have.status(201));

    it('should contain _id', () => {
      dog._id = response.body._id;
      return expect(response.body._id).to.exist;
    });
  });

  describe('GET /pets', () => {
    let response;

    before('send request', () => chakram
      .get(
        `${config.baseUrl}/api/pets`,
        {headers: {Authorization: `Bearer ${user.auth.access_token}`}}
      )
      .then((result) => {
        response = result;
      }));

    it('should return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('should return array', () => {
      expect(response.body).to.be.instanceof(Array);
    });
  });

  describe('GET one pet', () => {
    let response;

    before('send request', () => chakram
      .get(
        `${config.baseUrl}/api/pets/${dog._id}`,
        {
          headers: {Authorization: `Bearer ${user.auth.access_token}`}
        }
      )
      .then((result) => {
        response = result;
      }));

    it('should return status 200', () => {
      expect(response).to.have.status(200);
    });
    it('should return the same id', () => {
      expect(response.body._id).to.be.equal(dog._id);
    });
    it('should return the same name', () => {
      expect(response.body.name).to.be.equal(dog.name);
    });
    it('should return the same species', () => {
      expect(response.body.species).to.be.equal(dog.species);
    });
  });


  describe('PATCH /pets', () => {
    it('Should update dogs name', () => {
      const NEW_VALUE = 'new-username';
      //const NEW_SPECIES = 'new-species';

      let response;

      before('send request', () => chakram
        .patch(`${config.baseUrl}/api/pets/${dogs._id}`, {
          name: NEW_VALUE,
          //species: NEW_SPECIES,
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

      it('should change name', () => {
        expect(response).to.have.json('name', NEW_VALUE);
      });
      /*
       it('should change species', () => {
       expect(response).to.have.json('name', NEW_SPECIES);
       });
       */
    });
  });

  describe('PATCH /pets', () => {
    it('Should not update dogs species with invalid data', () => {
      const NEW_SPECIES = 'monkey';
      //const NEW_VALUE = 'name';

      let response;

      before('send request', () => chakram
        .patch(`${config.baseUrl}/api/pets/me`, {
          species: NEW_SPECIES,
        }, {
          headers: {
            Authorization: `Bearer ${user.auth.access_token}`,
          },
        })
        .then((result) => {
          response = result;
        }));

      it('should not return status 200', () => {
        expect(response).to.have.status(200);
      });
      it('should return status 400', () => {
        expect(response).to.have.status(400);
      });
    });
  });


  describe('DELETE /pets', () => {
    let response;

    before('send request', () => chakram
      .delete(`${config.baseUrl}/api/pets/${dog._id}`,
        {}, {
          headers: {
            Authorization: `Bearer ${user.auth.access_token}`,
          },
        })

      .then((result) => {
        response = result;
      }));

    it('should return status 204', () => {
      expect(response).to.have.status(204);
    });
  });
  after('remove user', () => specHelper.removeUser(user));
  after('remove dog', () => specHelper.removeUser(dog));
});
