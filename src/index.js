import 'core-js/fn/object/assign'
import React        from 'react'
import ReactDOM     from 'react-dom'
import { Provider } from 'react-redux'
import thunk        from 'redux-thunk'
import reducer      from 'store/reducers'
import { createStore, applyMiddleware } from 'redux'
import { Router, Route, hashHistory }   from 'react-router'

import Operate      from 'operate'
import OperateEdit  from 'operate/edit'
import Business     from 'business'
import BusinessEdit from 'business/edit'
import View         from 'view'
import ReviewTem    from 'reviewTem'
import NoMatch      from './containers/NoMatch'

import 'services/tools'

import 'animate.css'
import 'styles/common.less'
import 'styles/animate.less'
import 'antd/dist/antd.less'
import 'styles/fonts/iconfont.css'

const store = createStore(
	reducer,
	applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render((
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="operate" component={Operate}>
				<Route path="edit" component={OperateEdit} />
			</Route>
			<Route path="business" component={Business}>
				<Route path="edit" component={BusinessEdit} />
			</Route>
			<Route path="view" component={View} />
			<Route path="review" component={ReviewTem} />
			<Route path="*" component={NoMatch} />
		</Router>
	</Provider>
), document.getElementById('app'))
