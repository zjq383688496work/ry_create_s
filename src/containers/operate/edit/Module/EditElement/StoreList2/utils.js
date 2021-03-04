export const isRander = function() {
	let { data, ioInput } = this.props
	let visible = ioInput.visible[data._id]
	if (!visible || !visible.length) return true
	let { _id, name } = data
	let { param } = data.data.content.visibleStatus
	if (!param) return true			// 可见状态未启用
	let { type, value } = param[0]
	if (!type) return true			// 可见状态为无

	let hasVis = true

	let init = 0

	// console.log(name)
	visible.forEach(comp => {
		if (!hasVis) return
		let { compChildBind, visibleSwitch } = comp.data.content
		if (!compChildBind[_id]) return
		if (type === 'bool') {
			if (visibleSwitch == value) return
			hasVis = false
		}
		++init
	})
	// console.log(init)
	return hasVis
}