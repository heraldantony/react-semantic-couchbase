var ottoman = require('ottoman')

var CountryModel = ottoman.model('Country', {

  countryName: 'string',



  region: {
    ref: 'Region'
  }






}, {
  index: {


    findByRegion: {
      by: 'region'
    }




  }
})

CountryModel.createAndSave = function(
  countryName,
  done) {

  this.create({

    countryName,

  }, done)

}



CountryModel.prototype.setCountryName = function(countryName, done) {
  this.countryName = countryName
  this.save((err) => {
    if (err) return done(err);
    done(null, this);
  })
}




CountryModel.prototype.setRegion = function(region, done) {
  this.region = region
  this.save((err) => {
    if (err) return done(err);
    done(null, this);
  })
}







module.exports = CountryModel