/**
 * Module for converting JavaScript objects to hstore format.
 */
"use strict";

var hstore = {};

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
function quoteString(qString) {
  // Fairly brutal stripping of unsafe characters.
  qString = qString.replace(/[\\"'\t\r\n\v]/, '')

  // Naïve quoting of strings. Assumes there's not quotes in the string.
  return '"' + qString + '"';
}

/**
 * Convert JavaScript object to hstore format.
 */
hstore.stringify = function (data) {
  var pairs = [];

  Object.keys(data).forEach(function (key) {
    var value = convertToString(data[key]);

    if (value) {
      pairs.push('"' + key + '"=>' + value);
    }
  });

  return pairs.join();
};

module.exports = hstore;

