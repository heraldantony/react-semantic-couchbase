var ottoman = require('ottoman')

var RegionModel = ottoman.model('Region', {

	regionName: 'string'

}, {
	index: {

	}
})

RegionModel.createAndSave = function (
	regionName,
	done) {
	this.create({

		regionName

	}, done)
}

RegionModel.prototype.setRegionName = function (regionName, done) {
	this.regionName = regionName
	this.save((err) => {
		if (err) return done(err)
		done(null, this)
	})
}

module.exports = RegionModel
