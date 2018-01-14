var ottoman = require('ottoman')

var DepartmentModel = ottoman.model('Department', {

	departmentName: 'string',

	location: {
		ref: 'Location'
	},

	employees: [{
		ref: 'Employee'
	}]

}, {
	index: {

		findByLocation: {
			by: 'location'
		},

		findByEmployee: {
			by: 'employee'
		}

	}
})

DepartmentModel.createAndSave = function (
	departmentName,
	done) {
	this.create({

		departmentName

	}, done)
}

DepartmentModel.prototype.setDepartmentName = function (departmentName, done) {
	this.departmentName = departmentName
	this.save((err) => {
		if (err) return done(err)
		done(null, this)
	})
}

DepartmentModel.prototype.setLocation = function (location, done) {
	this.location = location
	this.save((err) => {
		if (err) return done(err)
		done(null, this)
	})
}

DepartmentModel.prototype.addEmployee = function (employee, done) {
	if (!this.employees) {
		this.employees = []
	}
	this.employees.push(employee)
	this.save((err) => {
		if (err) return done(err)
		done(null, this)
	})
}

module.exports = DepartmentModel
