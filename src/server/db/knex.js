var environment = process.env.NODE_ENV || 'development';
var config = require('../../../knexfile.js')[environment];

console.log(environment);

module.exports = require('knex')(config);
