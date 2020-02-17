import React from 'react'
import './index.less'

const firstMap = {
	1: true,
	2: true
}

export default class Text extends React.Component {
	state = {
		first: 1
	}
	componentDidMount() {}
	componentWillReceiveProps({ contentEditable }) {
		this.setState({ first: contentEditable? this.state.first + 1: 1 })
	} 
	handleBlur = ({ target }) => {
		var { data, actions } = this.props,
			{ content } = data.data
		data.feature.editStatus = true
		content.text = target.innerHTML.replace('双击编辑内容', '')
		actions.updateComp(null, data)
	}
	shouldComponentUpdate({ drag }, { first }) {
		if(drag != undefined) return drag && !!firstMap[first]
		else return !!firstMap[first]
	}
	render() {
		var { data, type, contentEditable, item, language } = this.props,
			style = { ...cssColorFormat(this.props, 'text'), cursor: contentEditable? 'auto': 'move' }
		if (item && item.featuredShop === false) return false

		var text = textByLanguage(data, language)

		return (
			<div className={`e-text`} id="e-text">
				<div
					ref="textDiv"
					style={style}
					contentEditable={contentEditable}
					onBlur={this.handleBlur}
					dangerouslySetInnerHTML={{__html: textBreak(text || '双击编辑内容')}}
				></div>
			</div>
		)
	}
}