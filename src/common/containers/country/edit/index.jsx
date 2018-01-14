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
import { COUNTRY_GET, COUNTRY_SAVE } from 'actions/country'
import { createStructuredSelector } from 'reselect'
import {makeSelectCountry, makeSelectCountryInitialValues} from 'selectors/country'

type Props = FormProps

const fields = [

	{
		placeholder: 'Country Name',
		name: 'countryName',
		label: 'Country Name',

		component: InputField
	}

]
class CountryEdit extends Component<Props, State> {
	componentDidMount () {
		if (this.props.match.params && this.props.match.params.id) {
			this.props.dispatch(COUNTRY_GET(this.props.match.params.id))
		}
	}

	render () {
		const {handleSubmit} = this.props
		return (
			<div>
				<Helmet>
					<title>Country</title>
				</Helmet>
				<Grid columns={1}>
					<Grid.Row centered>
						<Grid.Column width={16}>
							<Button><Link to={{
								pathname: `/country`,
								state: {}
							}}>Search Country</Link></Button>
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
	countryProps: makeSelectCountry(),
	initialValues: makeSelectCountryInitialValues()

}
)

const mapDispatchToProps = dispatch => ({
	async save (data) {
		console.log(data)
		return dispatch(COUNTRY_SAVE(data))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(
	reduxForm({ form: 'COUNTRY_EDIT_FORM', enableReinitialize: true })(CountryEdit)
)
