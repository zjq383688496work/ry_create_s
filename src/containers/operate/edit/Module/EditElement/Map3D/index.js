import React from 'react'
import './index.less'

class Map3D extends React.Component {
	shouldComponentUpdate(newProps, newState){
		return newProps.drag != undefined? newProps.drag: true
	}
	render() {
		return (
			<div className="e-map3d"></div>
		)
	}
}

export default Map3D
