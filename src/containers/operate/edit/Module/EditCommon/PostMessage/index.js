import React from 'react'

export default class PostMessage extends React.Component {
	componentDidMount() {
		window.addEventListener('message', this._handleMessage, false)
	}
	componentWillUnmount() {
		window.removeEventListener('message', this._handleMessage)
	}
	
	_handleMessage = e => {
		let { origin } = window.location,
			{ data } = e
		if (e.origin !== origin) return
	}
	
	render() {
		return null
	}
}
