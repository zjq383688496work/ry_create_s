/**
 * @Author: Along
 * @Date:   2018-05-07
 
 */

import React from 'react'
import './index.less'

class Button extends React.Component {
	shouldComponentUpdate(newProps, newState){
		if(newProps.drag != undefined){
			return newProps.drag
		}else{
			return true
		}
	}
	render() {
		let { type,data } = this.props;
		let style = cssColorFormat(this.props, 'text');
		return (   
			<div className='e_button' style={style}> 
				{data.data.content.text}  
			</div>     
		)  
	}  
} 
 
export default Button
