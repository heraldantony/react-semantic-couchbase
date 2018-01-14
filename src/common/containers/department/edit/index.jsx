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
import { DEPARTMENT_GET, DEPARTMENT_SAVE } from 'actions/department'
import { createStructuredSelector } from 'reselect'
import {makeSelectDepartment, makeSelectDepartmentInitialValues} from 'selectors/department'

type Props = FormProps

const fields = [

	{
		placeholder: 'Department Name',
		name: 'departmentName',
		label: 'Department Name',

		component: InputField
	}

]
class DepartmentEdit extends Component<Props, State> {
	componentDidMount () {
		if (this.props.match.params && this.props.match.params.id) {
			this.props.dispatch(DEPARTMENT_GET(this.props.match.params.id))
		}
	}

	render () {
		const {handleSubmit} = this.props
		return (
			<div>
				<Helmet>
					<title>Department</title>
				</Helmet>
				<Grid columns={1}>
					<Grid.Row centered>
						<Grid.Column width={16}>
							<Button><Link to={{
								pathname: `/department`,
								state: {}
							}}>Search Department</Link></Button>
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
	departmentProps: makeSelectDepartment(),
	initialValues: makeSelectDepartmentInitialValues()

}
)

const mapDispatchToProps = dispatch => ({
	async save (data) {
		console.log(data)
		return dispatch(DEPARTMENT_SAVE(data))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(
	reduxForm({ form: 'DEPARTMENT_EDIT_FORM', enableReinitialize: true })(DepartmentEdit)
)
