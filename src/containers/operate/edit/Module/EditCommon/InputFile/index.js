import React from 'react'
import './index.less'
import { Icon } from 'antd'

var unitMap = {
	1: 'B',
	2: 'KB',
	3: 'MB',
	4: 'GB',
	5: 'TB',
	6: 'PB',
}

export default class InputFile extends React.Component {
	state = {}
	componentDidMount() {} 
	componentWillReceiveProps(props) {}
	componentWillUnmount() {}
	
	getFile = ({ target }) => {
		var { maxFileSize, handleCheck } = this.props
		var { files } = target,
			[ file ]  = files,
			{ size }  = file

		var fSize = size2Str(size)
		if (maxFileSize != undefined && size > maxFileSize) return handleCheck && handleCheck(false, `文件大小不得超过: ${size2Str(size)} (当前 ${fSize})`)

		handleCheck && handleCheck(true, file)
	}
	render() {
		var { accept = '', children, loading = false } = this.props
		return (
			<div className="input-file">
				{
					!loading
					?
					<input type="file" accept={accept} onChange={this.getFile} />
					: null
				}
				{ children }
			</div>
		)
	}
}


function size2Str(size) {
	var strArr = `${size}`.replace(/(\d)(?=(\d{3})+$)/g, '$1,').split(','),
		[ num, point ] = strArr,
		len    = strArr.length,
		unit   = unitMap[len],
		str    = `${num}${point? '.' + point.substr(0, 1): ''}${unit}`
	console.log(str)
	return str
}