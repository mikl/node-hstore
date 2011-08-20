/**
 * Module for converting JavaScript objects to hstore format.
 */

var hstore = {};

"use strict";

/**
 * Convert an arbitrary value to string.
 */
function convertToString(value) {
  switch (typeof value) {
    case 'boolean':
      return String(value);
    case 'null':
      return 'NULL';
    case 'number':
      return isFinite(value) ? String(value) : 'NULL'
    case 'string':
      return quoteString(value);
  }
}

/**
 * Quote a string.
 */
function quoteString(string) {
  // Naïve quoting of strings. Assumes there's not quotes in the string.
  return '"' + string + '"';
}

/**
 * Convert JavaScript object to hstore format.
 */
hstore.stringify = function (data) {
  pairs = [];

  Object.keys(data).forEach(function (key) {
    var value = convertToString(data[key]);

    if (value) {
      pairs.push('"' + key + '"=>' + value);
    }
  });

  return pairs.join();
};

module.exports = hstore;

