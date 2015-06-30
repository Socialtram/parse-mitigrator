const async = require('async')
const Parse = require('parse').Parse
const Mitigrator = require('./lib/mitigrator')

exports = module.exports = function (opts) {
  return new Mitigrator(opts)
} 

exports.Parse = Parse
exports.Query = Parse.Query