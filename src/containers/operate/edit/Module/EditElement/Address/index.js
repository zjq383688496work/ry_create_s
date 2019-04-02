/**
 * @Author: Along
 * @Date:   2018-05-16
 
 */


import React from 'react'
import './index.less'

class Address extends React.Component {
	shouldComponentUpdate(newProps, newState){
		if(newProps.drag != undefined){
			return newProps.drag
		}else{
			return true
		}
	}
	render() { 
		let { data } = this.props
		// console.log(1, this.props)
		return ( 
			<div className="e-address">
				<img style={cssColorFormat(this.props, 'image')} src={compImgFormat(this.props, data.data.content.img)} />
				<span style={cssColorFormat(this.props, 'text')}>{data.data.content.text}</span>
			</div>  
		) 
	} 
}

export default Address 
