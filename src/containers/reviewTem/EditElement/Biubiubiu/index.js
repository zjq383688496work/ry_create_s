import React from 'react'
import json from 'compEdit/EditElement/Biubiubiu/data'
import barrage from 'compEdit/EditElement/Biubiubiu/barrage'
// import './index.less'

export default class Biubiubiu extends React.Component {
	constructor(props) {
		super(props)

		let { layout, content } = props.data.data,
			{ height } = layout,
			{ textColor, themeColor } = content

		this.state = {
			textColor:  textColor.color,
			themeColor: themeColor.color,
			maxTop:  height - 32,
			curItem: null
		}
	}
	shouldComponentUpdate(newProps, newState) {
		return newProps.drag != undefined? newProps.drag: true
	}
	componentDidMount() {
		let { textColor, maxTop } = this.state
		this.barrage = new barrage({
			$parent: this.refs.box,
			template: `
				<div class="biu-box">
					<div class="biu-img"><img src="{{photo}}"/></div>
					<span class="biu-text" style="color: ${textColor}">{{text}}</span>
					<div class="biu-zan"></div>
				</div>
			`,
			max: maxTop,
			loaded:   this.loaded,
			clicked:  this.clicked,
			updateed: this.updateed
		})
	}
	componentWillReceiveProps(props) {
	}
	componentWillUnmount() {
		if (this.barrage) this.barrage.destroy()
	}
	loaded = barrage => {
		barrage.append(json)
	}
	clicked = (e, id) => {
		e.stopPropagation()
		let { barrage } = this
		if (!barrage) return
		let ele = barrage.getElement(id)
		if (!ele) return
		this.setState({ curItem: ele.item })
	}
	updateed = () => {
		this.barrage.append(json)
	}
	renderBiu() {
		let { textColor: { color: textColor } } = this.state,
			newData = [json[0]]
		return newData.map((_, i) => {
			let { photo, text, fabulous } = _
			return (
				<div key={i} className="biu-box">
					<div className="biu-img"><img src={photo}/></div>
					<span className="biu-text" style={{ color: textColor }}>{ text }</span>
					<div className="biu-zan"></div>
				</div>
			)
		})
	}
	render() {
		let style = cssColorFormat(this.props, 'filterBox'),
			{ themeColor } = this.state
		style.color = themeColor
		return (
			<div ref="box" className="e_biubiubiu" style={style}>
			</div>
		)
	}
}