// @flow
import React, {Component} from 'react'
import {Helmet} from 'react-helmet'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import type {FormProps } from 'redux-form'
import {Grid, Header, Form, Button, Table} from 'semantic-ui-react'
import {FormattedMessage} from 'react-intl'
import { connect } from 'react-redux'
import InputField from 'components/elements/InputField'
import {DateTime} from 'react-datetime'
import TextAreaField from 'components/elements/TextAreaField'
import { EMPLOYEE_GET, EMPLOYEE_SAVE } from 'actions/employee'
import { createStructuredSelector } from 'reselect'
import {makeSelectEmployee, makeSelectEmployeeInitialValues} from 'selectors/employee'

type Props = FormProps

const fields = [

	{
		placeholder: 'First Name',
		name: 'firstName',
		label: 'First Name',

		component: InputField
	},

	{
		placeholder: 'Last Name',
		name: 'lastName',
		label: 'Last Name',

		component: InputField
	},

	{
		placeholder: 'Email',
		name: 'email',
		label: 'Email',

		component: InputField
	},

	{
		placeholder: 'Phone Number',
		name: 'phoneNumber',
		label: 'Phone Number',

		component: InputField
	},

	{
		placeholder: 'Hire Date',
		name: 'hireDate',
		label: 'Hire Date',

		component: DateTime
	},

	{
		placeholder: 'Salary',
		name: 'salary',
		label: 'Salary',

		component: InputField
	},

	{
		placeholder: 'Commission Pct',
		name: 'commissionPct',
		label: 'Commission Pct',

		component: InputField
	}

]
class EmployeeEdit extends Component<Props, State> {
	componentDidMount () {
		if (this.props.match.params && this.props.match.params.id) {
			this.props.dispatch(EMPLOYEE_GET(this.props.match.params.id))
		}
	}

	render () {
		const {handleSubmit} = this.props
		return (
			<div>
				<Helmet>
					<title>Employee</title>
				</Helmet>
				<Grid columns={1}>
					<Grid.Row centered>
						<Grid.Column width={16}>
							<Button><Link to={{
								pathname: `/employee`,
								state: {}
							}}>Search Employee</Link></Button>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row centered>
						<Grid.Column width={16}>
							<Form>
								{fields.map((a, i) => <Field key={i} {...a} />)}

								<div style={{ textAlign: 'right' }}>
									<Button content="Save" icon="save" onClick={handleSubmit(values =>
										this.props.save({
											...values,
											action: 'save'
										}))}/>
								</div>
							</Form>

						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		)
	}
}
const mapStateToProps = state => createStructuredSelector({
	employeeProps: makeSelectEmployee(),
	initialValues: makeSelectEmployeeInitialValues()

}
)

const mapDispatchToProps = dispatch => ({
	async save (data) {
		console.log(data)
		return dispatch(EMPLOYEE_SAVE(data))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(
	reduxForm({ form: 'EMPLOYEE_EDIT_FORM', enableReinitialize: true })(EmployeeEdit)
)
