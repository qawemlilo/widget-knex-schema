"use strict";


module.exports.createTable = function createTable(knex, tableName, columns, timestamps) {
  return knex.schema.createTable(tableName, function (table) {
    let columnKeys = Object.keys(columns);

    columnKeys.forEach(function (column) {
      addTableColumn(tableName, table, column, columns[column], knex);
    });

    if (timestamps) {
      table.timestamps(true, true);
    }
  });
};


function addTableColumn(tablename, table, columnname, columnSpec, knex) {
  let column;

  // creation distinguishes between text with fieldtype, string with maxlength and all others
  if (columnSpec.type === 'text' && columnSpec.hasOwnProperty('fieldtype')) {
    column = table[columnSpec.type](columnname, columnSpec.fieldtype);
  }
  else if (columnSpec.type === 'string' && columnSpec.hasOwnProperty('maxlength')) {
    column = table[columnSpec.type](columnname, columnSpec.maxlength);
  }
  else if (columnSpec.type === 'float' && columnSpec.hasOwnProperty('precision') && columnSpec.hasOwnProperty('scale')) {
    column = table[columnSpec.type](columnname, columnSpec.precision, columnSpec.scale);
  }
  else if (columnSpec.type === 'decimal' && columnSpec.hasOwnProperty('precision') && columnSpec.hasOwnProperty('scale')) {
    column = table[columnSpec.type](columnname, columnSpec.precision, columnSpec.scale);
  }
  else if (columnSpec.type === 'binary' && columnSpec.hasOwnProperty('maxlength')) {
    column = table[columnSpec.type](columnname, columnSpec.maxlength);
  }
  else if ((columnSpec.type === 'enum' || columnSpec.type === 'enu') && columnSpec.hasOwnProperty('values')) {
    column = table[columnSpec.type](columnname, columnSpec.values);
  }
  else {
    column = table[columnSpec.type](columnname);
  }


  if (columnSpec.hasOwnProperty('nullable') && columnSpec.nullable === true) {
    column.nullable();
  }
  else {
    column.notNullable();
  }

  if (columnSpec.hasOwnProperty('primary') && columnSpec.primary === true) {
    column.primary();
  }

  if (columnSpec.hasOwnProperty('unique') && columnSpec.unique) {
    column.unique();
  }

  if (columnSpec.hasOwnProperty('unsigned') && columnSpec.unsigned) {
    column.unsigned();
  }

  if (columnSpec.hasOwnProperty('references')) {
    if (columnSpec.hasOwnProperty('foreign') && columnSpec.foreign) {
      column.foreign(columnname).references(columnSpec.references);
    }
    else {
      column.references(columnSpec.references);
    }
  }

  if (columnSpec.hasOwnProperty('defaultTo') && columnSpec.defaultTo) {
    if (columnSpec.type === 'boolean') {
      column.defaultTo(columnSpec.defaultTo ? 1 : 0);
    }
    else {
      column.defaultTo(columnSpec.defaultTo);
    }
  }
};
