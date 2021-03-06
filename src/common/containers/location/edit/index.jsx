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
import { LOCATION_GET, LOCATION_SAVE } from 'actions/location'
import { createStructuredSelector } from 'reselect'
import {makeSelectLocation, makeSelectLocationInitialValues} from 'selectors/location'

type Props = FormProps

const fields = [

	{
		placeholder: 'Street Address',
		name: 'streetAddress',
		label: 'Street Address',

		component: InputField
	},

	{
		placeholder: 'Postal Code',
		name: 'postalCode',
		label: 'Postal Code',

		component: InputField
	},

	{
		placeholder: 'City',
		name: 'city',
		label: 'City',

		component: InputField
	},

	{
		placeholder: 'State Province',
		name: 'stateProvince',
		label: 'State Province',

		component: InputField
	}

]
class LocationEdit extends Component<Props, State> {
	componentDidMount () {
		if (this.props.match.params && this.props.match.params.id) {
			this.props.dispatch(LOCATION_GET(this.props.match.params.id))
		}
	}

	render () {
		const {handleSubmit} = this.props
		return (
			<div>
				<Helmet>
					<title>Location</title>
				</Helmet>
				<Grid columns={1}>
					<Grid.Row centered>
						<Grid.Column width={16}>
							<Button><Link to={{
								pathname: `/location`,
								state: {}
							}}>Search Location</Link></Button>
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
	locationProps: makeSelectLocation(),
	initialValues: makeSelectLocationInitialValues()

}
)

const mapDispatchToProps = dispatch => ({
	async save (data) {
		console.log(data)
		return dispatch(LOCATION_SAVE(data))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(
	reduxForm({ form: 'LOCATION_EDIT_FORM', enableReinitialize: true })(LocationEdit)
)
