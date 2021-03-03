export const isRander = function() {
	return true
	let { data, ioInput } = this.props
	let visible = ioInput.visible[data._id]
	if (!visible) return true
	let { param } = data.data.content.visibleStatus
	debugger
	let { visibleSwitch } = visible.data.content
	if (!param) return true			// 可见状态未启用
	let { type, value } = param[0]
	if (!type) return true			// 可见状态为无
	if (type === 'bool') {
		if (visibleSwitch == value) return true
		return false
	}
	return false
}