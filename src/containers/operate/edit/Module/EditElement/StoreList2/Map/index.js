import React from 'react'

export default class MapByStore2 extends React.Component {
	shouldComponentUpdate(newProps, newState){
		return newProps.drag != undefined? newProps.drag: true
	}
	render() {
		return (
			<div className="e-map2d e-map2d-hide"></div>
		)
	}
}
