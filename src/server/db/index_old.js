var couchbase = require('couchbase')

var cluster = new couchbase.Cluster('couchbase://' + process.env.DBHOST + '/')
cluster.authenticate(process.env.DBUSER, process.env.DBPASSWORD)
var bucket = cluster.openBucket(process.env.BUCKET)
var N1qlQuery = couchbase.N1qlQuery

module.exports = {
	query: (text, params, callback) => {
		const start = Date.now()
		return bucket.query(N1qlQuery.fromString(text), params, (err, res) => {
			const duration = Date.now() - start
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
	insertDocument: (name, doc, callback) => {
		const start = Date.now()
		return bucket.insert(name, doc, (err, res) => {
			const duration = Date.now() - start
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

	upsertSubDocumentTmp (docId, subDocKey, subDocument, callback) {
		const start = Date.now()
		bucket.lookupIn(docId).get(subDocKey).execute((err, res) => {
			const duration = Date.now() - start
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
				if (error) {
					console.log(error)
					callback(error, result)
					return
				}
				callback(error, result)
			})
		})
	},
	upsertSubDocument (docId, subDocKey, subDocument, callback) {
		const start = Date.now()
		bucket.mutateIn(docId).upsert(subDocKey, subDocument).execute((error, result) => {
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
	}
}
