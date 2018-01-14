// @flow
import React, {Component} from 'react'
import {Helmet} from 'react-helmet'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import type {FormProps } from 'redux-form'
import {Grid, Header, Form, Button, Icon, Label, Menu, Table} from 'semantic-ui-react'
import {FormattedMessage} from 'react-intl'
import { connect } from 'react-redux'
import InputField from 'components/elements/InputField'
import { REGION_SEARCH } from 'actions/region'
import { createStructuredSelector } from 'reselect';
import {makeSelectSearchRegion} from 'selectors/region'

type Props = FormProps

const headerNames = [

	"Region Name"
 ]
const searchFields = [{
	placeholder: 'Search',
	name: 'search',
	label: 'Search',
	component: InputField
}]
class RegionSearch extends Component<Props, State> {
	render () {
		const {handleSubmit, searchProps} = this.props
		return (
			<div>
				<Helmet>
					<title>Regions</title>
				</Helmet>
				<Grid columns={1}>
					<Grid.Row centered>
						<Grid.Column width={16}>
                                                <Button><Link to={{
                                                  pathname: `/addRegion`,
                                                  state: {}
                                                  }}>Add Region</Link></Button>  
                                                </Grid.Column>
                                        </Grid.Row>
					<Grid.Row centered>
						<Grid.Column width={16}>
							<Form>
								{searchFields.map((a, i) => <Field key={i} {...a} />)}

								<div style={{ textAlign: 'right' }}>
									<Button content="Search" icon="search" onClick={handleSubmit(values =>
										this.props.search({
											...values,
											action: 'search'
										}))}/>
								</div>
							</Form>

						</Grid.Column>
					</Grid.Row>
				</Grid>
                     { (searchProps && searchProps.regions.length) ?  (
<Table celled>
    <Table.Header>
      <Table.Row>

	<Table.HeaderCell>Region Name</Table.HeaderCell>
 
	<Table.HeaderCell>&nbsp;</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
     { searchProps.regions.map((region, idx) => {
      return ( <Table.Row key={"region_"+idx}>

	<Table.Cell>{region["regionName"]}</Table.Cell>
 
	<Table.Cell><Link to={"/editRegion/"+region["_id"]}><Button icon><Icon name="edit"/></Button></Link>
  <Link to={"/viewRegion/"+region["_id"]}><Button icon><Icon name="unhide"/></Button></Link></Table.Cell>
      </Table.Row> )
      })
    }
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='left chevron' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='right chevron' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
 ) : ""
}
                         
			</div>
		)
	}
}
const mapStateToProps = state => createStructuredSelector({
        searchProps: makeSelectSearchRegion()
      }
    )

const mapDispatchToProps = dispatch => ({
	async search (data) {
		// if(data.action == "search") {}
		console.log(data)
		return dispatch(REGION_SEARCH(data.search))
	}
})

export default reduxForm({ form: 'REGION_SEARCH_FORM' })(
	connect(mapStateToProps, mapDispatchToProps)(RegionSearch)
)

