'use strict'

const Parse = require('parse').Parse
const Fetch = require('./fetch')

module.exports = Mitigrator

function Mitigrator(opts) {
  opts = opts || {}

  if (!opts.appId || !opts.appKey) {
    throw new TypeError('Missing required arguments: appId, appKey')
  }

  this.opts = opts
  Parse.initialize(opts.appId, opts.appKey)
}

Mitigrator.prototype.createQuery = function (entity) {
   return new Parse.Query(entity)
}

Mitigrator.prototype.fetch = function (query, next) {
  let fetcher = new Fetch(query)
  fetcher.run(next)
  return fetcher
}
