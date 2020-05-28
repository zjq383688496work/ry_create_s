import React, { Component } from 'react'
import { Input } from 'antd'
import DateSet from './dateSet'
import './index.less'

export default class DatePickerNew extends Component {
	constructor(props) {
		super(props)
		let { date } = props
		let { min, max } = this.getRange()
		this.state = {
			min,
			max,
			date,
		}
	}
	componentWillReceiveProps(props) {
		let { date } = props
		this.setState({ date })
	}
	componentWillMount() {}
	getRange() {
		let now = new Date(),
			str = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`,
			min = new Date(str).getTime(),
			max = min + 90 * 86400000
		return { min, max }
	}
	showDate = () => {
		this.setState({ now: Date.now() }, () => this.refs.dateModal.show())
	}
	dateChange = date => {
		this.props.onChange(date)
	}
	renderDate = () => {
		let { date, min, max } = this.state
		return (
			<DateSet 
				ref="dateModal"
				min={min} 
				max={max} 
				confirm={this.dateChange}
				now={Date.now()}
				defaultValue={date}
				remove={() => this.dateChange(['', ''])}
			/>
		)
	}
	render(){
		let [ start, end ] = this.state.date,
			dateDom = this.renderDate(),
			show = start && end? `${start}-${end}`: '点击选择日期范围'
		return (
			<div>
				<div onClick={this.showDate} className="dateInput">{ show }</div>
				{ dateDom }
			</div>
		)
	}
}