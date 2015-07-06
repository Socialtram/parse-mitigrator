'use strict'

module.exports = Fetch

function Fetch(query) {
  this.q     = query
  this.skip  = 0
  this.total = 0
  this.limit = 1000
}

Fetch.prototype.run = function (next) {
  const self = this
  this.q.count().then((total) => {
    self.total = total
    self.next(next)
  }, next)
}

Fetch.prototype.next = function (next) {
  next = next.bind(this)

  if (false === this.hasMore()) {
    return next()
  }

  this.q.limit(this.limit)
  this.q.skip(this.skip)

  const self = this
  this.q.find().then((collection) => {
    self.skip = self.skip === 0
      ? self.limit
      : self.skip + self.limit

    next(null, collection)
  }, next)
}

Fetch.prototype.hasMore = function () {
  return this.total > this.limit
}
