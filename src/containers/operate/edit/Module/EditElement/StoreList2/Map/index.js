/**
 * @Author: Along
 * @Date:   2018-05-07
 * 2D地图组件
 */

import React from 'react'
import './index.less'

export default class MapByStore2 extends React.Component {
	shouldComponentUpdate(newProps, newState){
		if(newProps.drag != undefined){
			return newProps.drag
		}else{
			return true
		}
	}
	render() {
		return (
			<div className="e-map2d">
				<div id="e_map2D" className="e_map2D">
					<img src="http://rongyi.b0.rongyi.com/commodity/text/201811081800362935.png" />
				</div>
			</div>
		)
	}
}
