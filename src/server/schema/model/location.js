var ottoman = require('ottoman')

var LocationModel = ottoman.model('Location', {

	streetAddress: 'string',

	postalCode: 'string',

	city: 'string',

	stateProvince: 'string',

	country: {
		ref: 'Country'
	}

}, {
	index: {

		findByCountry: {
			by: 'country'
		}

	}
})

LocationModel.createAndSave = function (
	streetAddress,

	postalCode,

	city,

	stateProvince,
	done) {
	this.create({

		streetAddress,

		postalCode,

		city,

		stateProvince

	}, done)
}

LocationModel.prototype.setStreetAddress = function (streetAddress, done) {
	this.streetAddress = streetAddress
	this.save((err) => {
		if (err) return done(err)
		done(null, this)
	})
}

LocationModel.prototype.setPostalCode = function (postalCode, done) {
	this.postalCode = postalCode
	this.save((err) => {
		if (err) return done(err)
		done(null, this)
	})
}

LocationModel.prototype.setCity = function (city, done) {
	this.city = city
	this.save((err) => {
		if (err) return done(err)
		done(null, this)
	})
}

LocationModel.prototype.setStateProvince = function (stateProvince, done) {
	this.stateProvince = stateProvince
	this.save((err) => {
		if (err) return done(err)
		done(null, this)
	})
}

LocationModel.prototype.setCountry = function (country, done) {
	this.country = country
	this.save((err) => {
		if (err) return done(err)
		done(null, this)
	})
}

module.exports = LocationModel
