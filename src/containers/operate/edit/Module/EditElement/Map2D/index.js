import React from 'react'
import './index.less'

class Map2D extends React.Component {
	shouldComponentUpdate(newProps, newState){
		return newProps.drag != undefined? newProps.drag: true
	}
	render() {
		return (
			<div className="e-map2d"></div>
		)
	}
}

export default Map2D
