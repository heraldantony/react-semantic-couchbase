var couchbase = require('couchbase')
var ottoman = require('ottoman')

var cluster = new couchbase.Cluster('couchbase://' + process.env.DBHOST + '/')
cluster.authenticate(process.env.DBUSER, process.env.DBPASSWORD)
var bucket = cluster.openBucket(process.env.BUCKET)

const SEARCH_INDEX = process.env.SEARCH_INDEX

var N1qlQuery = couchbase.N1qlQuery
var SearchQuery = couchbase.SearchQuery

// ottoman.bucket = bucket
ottoman.N1qlQuery = N1qlQuery
ottoman.store = new ottoman.CbStoreAdapter(bucket, ottoman)

require('../schema/model/region')

require('../schema/model/country')

require('../schema/model/location')

require('../schema/model/department')

require('../schema/model/task')

require('../schema/model/employee')

require('../schema/model/job')

require('../schema/model/jobhistory')


// Build the necessary indexes to function
ottoman.ensureIndices(function() {})

module.exports = {
  query: (text, params, callback) => {
    const start = Date.now()
    return bucket.query(N1qlQuery.fromString(text), params, (err, res) => {
      const duration = Date.now() - start
      if (err) module.exports.reopenBucketOnErr(err)
      if (!err) {
        console.log('executed query', {
          text,
          duration,
          rows: res
        })
      } else console.log(err)
      callback(err, res)
    })
  },
  queryEntity: (entityType, text, options, callback) => {
    const start = Date.now()
    /*
                var term = SearchQuery.term(text)
                var typeTerm = SearchQuery.term(entityType)
                typeTerm.field = '_type'
                console.log("Search Index = ", SEARCH_INDEX);
                var queryTerms = SearchQuery.conjuncts([typeTerm, term])
*/
    var queryTerms = SearchQuery.queryString('+_type:' + entityType + ' ' + text)
    var query = SearchQuery.new(SEARCH_INDEX, queryTerms)


    query.skip(options.skip)
    query.limit(options.limit)
    query.fields(["*"])
    return bucket.query(query, (err, res, meta) => {
      const duration = Date.now() - start
      if (err) module.exports.reopenBucketOnErr(err)
      if (!err) {
        console.log('executed query', {
          text,
          duration,
          rows: res
        })
      } else console.log(err)
      callback(err, res, meta)
    })
  },
  insertDocument: (name, doc, callback) => {
    const start = Date.now()
    return bucket.insert(name, doc, (err, res) => {
      const duration = Date.now() - start
      if (err) module.exports.reopenBucketOnErr(err)
      if (!err) {
        console.log('executed query', {
          doc,
          duration,
          rows: res
        })
      } else console.log(err)
      callback(err, res)
    })
  },
  upsertDocument: (docId, doc, callback) => {
    const start = Date.now()
    return bucket.upsert(docId, doc, (err, res) => {
      const duration = Date.now() - start
      if (err) module.exports.reopenBucketOnErr(err)
      if (!err) {
        console.log('executed query', {
          doc,
          duration,
          rows: res
        })
      } else console.log(err)
      callback(err, res)
    })
  },

  upsertSubDocumentTmp(docId, subDocKey, subDocument, callback) {
    const start = Date.now()
    bucket.lookupIn(docId).get(subDocKey).execute((err, res) => {
      const duration = Date.now() - start
      if (err) module.exports.reopenBucketOnErr(err)
      if (!err) {
        console.log('executed query', {
          docId,
          duration,
          rows: res
        })
      } else {
        console.log(err)
        callback(err, res)
        return
      }

      bucket.mutateIn(docId).upsert(subDocKey, subDocument).execute((error, result) => {
        if (error) module.exports.reopenBucketOnErr(error)
        if (error) {
          console.log(error)
          callback(error, result)
          return
        }
        callback(error, result)
      })
    })
  },
  upsertSubDocument(docId, subDocKey, subDocument, callback) {
    const start = Date.now()
    bucket.mutateIn(docId).upsert(subDocKey, subDocument).execute((error, result) => {
      if (error) module.exports.reopenBucketOnErr(error)
      if (error) {
        console.log(error)
        callback(error, result)
        return
      }
      const duration = Date.now() - start
      console.log('executed query', {
        docId,
        subDocKey,
        duration,
        rows: result
      })
      callback(error, result)
    })
  },
  reopenBucket: () => {
    bucket = cluster.openBucket(process.env.BUCKET)
  },
  reopenBucketOnErr: (err) => {
    if (err) {
      if (err.message === 'cannot perform operations on a shutdown bucket' ||
        (err instanceof couchbase.Error && err.code === 16)) {
        module.exports.openBucket(process.env.BUCKET)
      }
    }
  }
}