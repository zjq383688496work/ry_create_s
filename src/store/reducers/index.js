import { combineReducers } from 'redux'
import editConfig  from './editConfig'
import user        from './user'
import time        from './time'

const rootReducer = combineReducers({
	editConfig,
	user,
	time
})

export default rootReducer
