/**
 * Module for converting JavaScript objects to hstore format.
 */
"use strict";

var hstore = {};

/**
 * Convert an arbitrary value to string.
 */
function convertToString(value) {
  if (value === null) {
    return 'NULL';
  }
  
  switch (typeof value) {
    case 'boolean':
      return String(value);
    case 'number':
      return isFinite(value) ? String(value) : 'NULL'
    case 'string':
      return JSON.stringify(value);
  }
}

/**
 * Convert JavaScript object to hstore format.
 */
hstore.stringify = function (data) {
  
  var pairs = Object.keys(data).map(function (key) {
    var value = convertToString(data[key]);

    if (value) {
      return JSON.stringify(key) + '=>' + value;
    }
  });

  return pairs.join();
};

module.exports = hstore;

