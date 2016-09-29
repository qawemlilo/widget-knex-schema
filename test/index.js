"use strict";

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './test.sqlite'
  },
  useNullAsDefault: true
});
const chai = require('chai');
const should = chai.should();
const widgetKnexSchema = require('../');
const usersSchema = require('./schema');

describe('Run migrations', function () {
  "use strict";

  let App;

  before(function (done) {
    widgetKnexSchema.createTable(knex, 'users', usersSchema, true)
    .then(function () {
      return knex('users').insert({
        name: 'admin',
        email: 'test@test.com',
        password: 'password'
      });
    })
    .then(function () {
      done()
    })
    .catch(function (error) {
      done(error);
    });
  });

  describe('Select created user', function() {
    it('should return created user', function(done) {
      knex('users').where({email: 'test@test.com'}).select('*')
      .then(function (users) {
        let user = users[0];

        user.email.should.be.eql('test@test.com');
        user.name.should.be.eql('admin');
        user.created_at.should.be.a.Date;
        user.updated_at.should.be.a.Date;

        done();
      })
      .catch(done);
    });
  });

  after(function (done) {
    require('fs').unlinkSync('./test.sqlite');
    console.log(' > Database reset complete');
    done();
  });
});
