"use strict";

module.exports = {
  id: {type: 'increments', nullable: false, primary: true},
  test_string: {type: 'string', maxlength: 254, nullable: false},
  test_medium_text: {type: 'text', fieldtype: 'mediumtext', nullable: false},
  test_longtext_text: {type: 'text', fieldtype: 'longtext', nullable: false},
  test_float: {type: 'float', precision: 8, scale: 2, nullable: false},
  test_decimal: {type: 'decimal', precision: 8, scale: 2, nullable: false},
  test_bool: {type: 'boolean', nullable: false, defaultTo: true},
  test_binary: {type: 'binary', maxlength: 200, nullable: false},
  test_enum: {type: 'enum', values: ['y', 'n']},
  test_date: {type: 'date', nullable: false},
  test_dateTime: {type: 'dateTime', nullable: false},
  test_time: {type: 'time', nullable: false},
  test_timestamp: {type: 'timestamp', nullable: false},
  test_json: {type: 'json', nullable: false},
  test_jsonb: {type: 'jsonb', nullable: false},
  test_uuid: {type: 'uuid', nullable: false}
};
