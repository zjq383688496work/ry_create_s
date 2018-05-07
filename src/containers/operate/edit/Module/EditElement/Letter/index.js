/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

class Letter extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	selectVal(str) {
		let { parent, actions, ioInput, ioOuter } = this.props
		if (ioInput.api.body.letter === str || !parent) return
		ioInput.api.body.letter = str
		ioOuter(ioInput)
	}

	// 字母+数字
	renderStyle1(letter, num, nowVal) {
		let arr = [...letter, ...num]
		return (
			<div className="el-6">
				{ arr.map((_, i) => (<div className={`el-item${_ === nowVal? ' s-active': ''}`} key={i} onClick={this.selectVal.bind(this, _)}>{_}</div>)) }
			</div>
		)
	}
	// 字母
	renderStyle2(letter, num, nowVal) {
		let { data } = this.props
		let arr = [...letter]
		return (
			<div className="el-6">
				{ arr.map((_, i) => (<div className={`el-item${_ === nowVal? ' s-active': ''}`} key={i} onClick={this.selectVal.bind(this, _)}>{_}</div>)) }
			</div>
		)
	}
	// 数字
	renderStyle3(letter, num, nowVal) {
		let { data } = this.props
		let arr = [...num]
		return (
			<div className="el-6">
				{ arr.map((_, i) => (<div className={`el-item${_ === nowVal? ' s-active': ''}`} key={i} onClick={this.selectVal.bind(this, _)}>{_}</div>)) }
			</div>
		)
	}
	
	render() {
		let { type, ioInput } = this.props
		let letter   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
		let num      = Array.from(new Array(10), (_, i) => `${i}`)
		let dom      = this[`render${type}`].bind(this, letter, num, ioInput.api.body.letter)()
		return (
			<section className={`e-letter ${type}`}>
				{ dom }
			</section>
		)
	}
}

export default Letter