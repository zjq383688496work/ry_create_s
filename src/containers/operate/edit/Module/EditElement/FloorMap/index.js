import React from 'react'

export default class FloorMap extends React.Component {
	/**
	 * 组件挂载完成
	*/
	shouldComponentUpdate(newProps, newState){
		return newProps.drag != undefined? newProps.drag: true
	}

	render() {
		return (
			<div className="e-map2d e-map2d-hide"></div>
		) 
	}
}