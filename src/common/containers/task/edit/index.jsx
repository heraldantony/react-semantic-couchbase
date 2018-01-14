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
import { TASK_GET, TASK_SAVE } from 'actions/task'
import { createStructuredSelector } from 'reselect'
import {makeSelectTask, makeSelectTaskInitialValues} from 'selectors/task'

type Props = FormProps

const fields = [

	{
		placeholder: 'Title',
		name: 'title',
		label: 'Title',

		component: InputField
	},

	{
		placeholder: 'Description',
		name: 'description',
		label: 'Description',

		component: InputField
	}

]
class TaskEdit extends Component<Props, State> {
	componentDidMount () {
		if (this.props.match.params && this.props.match.params.id) {
			this.props.dispatch(TASK_GET(this.props.match.params.id))
		}
	}

	render () {
		const {handleSubmit} = this.props
		return (
			<div>
				<Helmet>
					<title>Task</title>
				</Helmet>
				<Grid columns={1}>
					<Grid.Row centered>
						<Grid.Column width={16}>
							<Button><Link to={{
								pathname: `/task`,
								state: {}
							}}>Search Task</Link></Button>
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
	taskProps: makeSelectTask(),
	initialValues: makeSelectTaskInitialValues()

}
)

const mapDispatchToProps = dispatch => ({
	async save (data) {
		console.log(data)
		return dispatch(TASK_SAVE(data))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(
	reduxForm({ form: 'TASK_EDIT_FORM', enableReinitialize: true })(TaskEdit)
)
