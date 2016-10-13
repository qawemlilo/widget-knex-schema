"use strict";

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './records.sqlite'
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
    widgetKnexSchema.createTable(knex, 'records', usersSchema, true)
    .then(function () {
      console.log('records table created');

      return knex('records').insert({
        test_string: 'This is a st',
        test_medium_text: 'This is a mediumtext field',
        test_longtext_text: 'This is a longtext field',
        test_bool: true,
        test_float: 123456.78,
        test_decimal: 123456.78,
        test_binary: 10100011011001010101001011011,
        test_enum: 'y',
        test_date: new Date().toISOString().slice(0, 10),
        test_dateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
        test_time: new Date().toISOString().slice(11, 19),
        test_timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        test_json: JSON.stringify(['a','b']),
        test_jsonb: JSON.stringify(['c','d']),
        test_uuid: 'uuid_' + Date.now()
      });
    })
    .then(function () {
      done()
    })
    .catch(function (error) {
      done(error);
    });
  });

  describe('Select created records', function() {
    it('should return created records', function(done) {
      knex.select().table('records')
      .then(function (records) {
        let record = records[0];

        record.test_string.should.be.eql('This is a st');
        record.test_medium_text.should.be.eql('This is a mediumtext field');
        record.test_longtext_text.should.be.eql('This is a longtext field');
        record.test_float.should.be.eql(123456.78);
        record.test_decimal.should.be.eql(123456.78);
        record.test_enum.should.be.eql('y');
        record.test_bool.should.be.eql(1);
        record.test_date.should.be.a.Date;
        record.test_dateTime.should.be.a.Date;
        record.test_time.should.be.a.Date;
        record.test_timestamp.should.be.a.Date;
        JSON.parse(record.test_json).length.should.be.eql(2);
        JSON.parse(record.test_jsonb).length.should.be.eql(2);

        done();
      })
      .catch(done);
    });
  });

  after(function (done) {
    require('fs').unlinkSync('./records.sqlite');
    console.log(' > Database reset complete');
    done();
  });
});
