export default calcOffset
function calcOffset(list, props, _cols, _rows) {
	let { content, layout, style } = props.data.data,
		{ bufferOptions, swiperOptions } = content,
		{ indexMultiple, increment } = bufferOptions,
		{ width }  = layout,
		{ filter } = style,
		{ width: cWidth, margin } = filter,
		{ right, left } = margin,
		rows = width / (cWidth + right + left) >> 0,
		{ offsetX, offsetY, offsetS, offsetR, speed, delay } = bufferOptions,
		{ offsetXStr, offsetYStr, offsetSStr, offsetRStr }   = bufferOptions,
		oxRange = getRange(offsetXStr, indexMultiple),
		oyRange = getRange(offsetYStr, indexMultiple),
		osRange = getRange(offsetSStr, indexMultiple),
		orRange = getRange(offsetRStr, indexMultiple),
		curXInc,
		curYInc,
		curSInc,
		curRInc
	
	let styles = list.map((_, i) => {
		let remainder = i % indexMultiple
		curXInc = offsetX * oxRange[remainder]
		curYInc = offsetY * oyRange[remainder]
		curSInc = offsetS * osRange[remainder]
		curRInc = offsetR * orRange[remainder]
		return {
			transform: `translate(${curXInc}px, ${curYInc}px) scale(${curSInc}) rotate(${curRInc}deg)`,
		}
	})
	return styles
}

function getRange(str, length) {
	let range = str.replace(/\s/g, '').split(',')
	new Array(length).fill().forEach((_, i) => {
		var val = parseFloat(range[i] || 1)
		if (isNaN(val)) val = 1
		range[i] = val
	})
	return range
}
