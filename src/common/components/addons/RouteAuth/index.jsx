/**
 * @flow
 */
import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { isLoggedIn } from 'api/LocalStorageCookiesSvc'

/**
 * Component that protects route from unauthorized users.
 */

type Props = {
	canAccess: string => boolean,
	path: string
}

const RouteAuth = (props: Props) => {
	var { canAccess, path } = props
	// FIXME - canAccess is undefined in some cases
	canAccess = canAccess || isLoggedIn
	return canAccess && canAccess(path) ? <Route {...props} /> : <Redirect to="/auth" />
}

export default RouteAuth
