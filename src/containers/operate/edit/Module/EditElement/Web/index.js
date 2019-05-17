/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

class Web extends React.Component {
	state = {
		url:        '',
		first:      1,
		showEditer: false,
	}
	componentDidMount(){
		// this.handleFocus(this.props)	
	}
	componentWillReceiveProps(props){
		// let { contentEditable } = this.props
		// if(props.contentEditable){
		// 	let num = this.state.first + 1
		// 	this.setState({ first: num })
		// }else{ 
		// 	this.setState({ first: 1 })
		// }  
	}   
	// handleFocus = props => {
	// 	let { contentEditable } = props
	// 	if(contentEditable){
	// 		let dom = this.refs['webDiv']
	// 		dom.onfocus = ()=>{
	// 			selectText(dom)
	// 		}
	// 		dom.focus()
	// 	}
	// }
	handleBlur = e => {
		var { data, actions } = this.props,
			{ content } = data.data,
			url = e.target.innerText.replace(/\s/g, '')
			e.target.innerHTML = url
		content['url'] = url
		data['feature'].editStatus = true
		this.setState({ showEditer: false })
		actions.updateComp(null, data)
	} 
	urlCheck = val => {
		return /https?\:\/\/[-\w+&@#/%?=~_|!:,.;]+[-\w+&@#/%=~_|]/.test(val)
	}
	shouldComponentUpdate(newProps, newState){
		if (newProps.drag != undefined) {
			return newProps.drag
		} else {
			return true
		}
		// if(newProps.drag != undefined){
		// 	return newProps.drag && (newState.first ==1 || newState.first == 2)
		// }else{
		// 	return newState.first ==1 || newState.first == 2
		// }
	}
	urlEdit = () => {
		this.setState({ showEditer: true }, () => {
			var dom = this.refs['webDiv']
			selectText(dom)
		})
	}
	render() { 
		let { url } = this.props.data.data.content,
			{ showEditer } = this.state,
			isUrl   = this.urlCheck(url),
			styleE  = { display: showEditer? 'block': 'none' },
			styleF  = { display: isUrl? 'block': 'none' }
		return (  
			<div className="e-web" id="e-web" onDoubleClick={this.urlEdit}>
				<div 
					className="title"
					ref="webDiv"
					contentEditable={true} 
					onBlur={this.handleBlur}
					style={styleE}
				>请输入Url</div>
				<iframe
					className="ew-iframe"
					src={url}
					scrolling={'no'}
					sandbox="allow-top-navigation"
					style={styleF}
				/>
			</div>
		)
	}
}

export default Web

function selectText(text) {
	if (!window.getSelection) return
    var selection = window.getSelection(),
    	range     = document.createRange()
    range.selectNodeContents(text)
    selection.removeAllRanges()
    selection.addRange(range)
}