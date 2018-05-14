/*
* @Author: Liao Hui
* @Date:   2018-04-13T18:13:16+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-18T19:44:00+08:00
*/

import 'core-js/fn/object/assign'
import React        from 'react'
import ReactDOM     from 'react-dom'
import { Provider } from 'react-redux'
import thunk        from 'redux-thunk'
import reducer      from 'store/reducers'
import { createStore, applyMiddleware } from 'redux'
import { Router, Route, hashHistory }   from 'react-router'

import View        from 'view'

import NoMatch     from './containers/NoMatch'
import tools       from 'services/tools'

import 'styles/common.less'
import 'styles/animate.less'
import 'antd/dist/antd.less'

tools()

const store = createStore(
	reducer,
	applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

debugger

// Render the main component into the dom
ReactDOM.render((
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="view" component={View}>
			<Route path="*" component={NoMatch}>
		</Router>
	</Provider>
), document.getElementById('app'))
