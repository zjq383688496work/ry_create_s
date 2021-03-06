import React from 'react'

import './index.less' 

class Navigation extends React.Component {
	
	shouldComponentUpdate(newProps, newState){
		return newProps.drag != undefined? newProps.drag: true
	}
 
	to = event => {
		event.preventDefault()
	}
	
	
	render() { 
		let { data } = this.props
		
		return (
			<div className="e-navigation">
				<div className="navigation_box" style={cssColorFormat(this.props, 'filterBox')}>
					{
						data.data.content.map((item,index) => <OnlyNavigation props={this.props} data={item} key={index}></OnlyNavigation>)
					}  
				</div>
					
			</div>  
		) 
	}
}
 
function OnlyNavigation({data,props}) {

	return ( 
			<div className="only" style={cssColorFormat(props, 'filter')} > 
				<img src={data.img.img} />    
				<p style={cssColorFormat(props, 'text')}>{data.title}</p>
			</div>
		)
}
export default Navigation