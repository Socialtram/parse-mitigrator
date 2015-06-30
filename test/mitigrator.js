'use strict'

const sinon = require('sinon')
const expect = require('chai').expect
const mitigrator = require('..')

const appId = process.env.PARSE_APPID
const appKey = process.env.PARSE_KEYID

suite('mitigrator', function () {
  test('fetch', function (done) {
    const client = mitigrator({ 
      appId: appId,
      appKey: appKey
    })

    let q = client.createQuery('User')
    q.exists('email')

    let fetcher = client.fetch(q, next)
    fetcher.limit = 5

    let buf = []

    function next(err, data) {
      if (buf.length >= 10 || !this.hasMore()) return done(err)

      buf = buf.concat(data)
      expect(err).to.be.null
      expect(data).to.be.an('array')
      expect(data.length).to.be.equal(fetcher.limit)
      expect(data.shift()).to.be.an('object')

      if (this.hasMore()) {
        this.next(next)
      }
    }
  })
})