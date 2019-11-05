import React from 'react'
import './index.less'

const firstMap = {
	1: true,
	2: true
}

export default class Web extends React.Component {
	state = {
		url: '', first: 1
	}
	componentDidMount() {}
	componentWillReceiveProps({ contentEditable }) {
		this.setState({ first: contentEditable? this.state.first + 1: 1 })
	}
	handleBlur = ({ target }) => {
		var { data, actions } = this.props,
			{ content } = data.data
		data.feature.editStatus = true
		content.url = target.innerHTML.replace('请输入url', '')
		actions.updateComp(null, data)
	}
	urlCheck = val => {
		let RP = /https?\:\/\/[-\w+&@#/%?=~_|!:,.;]+[-\w+&@#/%=~_|]/
		return RP.test(val)
	}
	shouldComponentUpdate({ drag }, { first }) {
		if(drag != undefined) return drag && !!firstMap[first]
		else return !!firstMap[first]
	}
	render() {
		let { data, contentEditable } = this.props,
			{ url } = data.data.content,
			style = { cursor: contentEditable? 'auto': 'move' }
		return (
			<div className="e-web" id="e-web">
				{
					this.urlCheck(url)
					?
					<iframe className="ew-iframe" src={url} scrolling={'no'} />
					:
					<div
						className="title"
						style={style}
						ref="webDiv"
						contentEditable={ contentEditable }
						onBlur={this.handleBlur}
						dangerouslySetInnerHTML={{__html: textBreak('请输入url')}}
					></div>
				}
			</div>
		)
	}
}