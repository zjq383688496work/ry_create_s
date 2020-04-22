import * as types from '../constants'

const initialState = {
	userInfo: {}
}
window.uif = initialState
export default function layers(state = initialState, action) {
	switch (action.type) {
		case types.UPDATE_USER:
			console.log('更新用户信息!')
			return Object.assign({}, action.user)

		default:
			return state
	}
}
