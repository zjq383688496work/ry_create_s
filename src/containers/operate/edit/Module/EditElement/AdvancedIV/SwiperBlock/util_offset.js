const { ceil } = Math

export default calcOffset
function calcOffset(idx, slides, bufferOptions) {
	slides = Object.values(slides).filter(slide => {
		let attr = getAttr(slide)
		return attr != 'Number'
	})
	let {
			indexMultiple,
			offsetX, offsetXStr,
			offsetY, offsetYStr,
			offsetS, offsetSStr,
			offsetR, offsetRStr,
			offsetO, offsetOStr,
			offsetZ, offsetZStr,
		} = bufferOptions,
		length  = indexMultiple,
		offset  = ceil(indexMultiple / 2),
		index   = idx - offset + 1,
		init    = 0

	if (index < 0) {
		length = indexMultiple + index
		init   = -index
		index  = 0
	}

	slides.forEach(slide => {
		slide.style.transform = ''
		slide.style.opacity   = ''
		slide.style.zIndex    = ''
	})

	let list = slides.slice(index, index + length)
	let oxRange = getRange(offsetXStr, indexMultiple),
		oyRange = getRange(offsetYStr, indexMultiple),
		osRange = getRange(offsetSStr, indexMultiple),
		orRange = getRange(offsetRStr, indexMultiple),
		ooRange = getRange(offsetOStr, indexMultiple),
		ozRange = getRange(offsetZStr, indexMultiple),
		curXInc,
		curYInc,
		curSInc,
		curRInc,
		curOInc,
		curZInc

	list.forEach((slide, i) => {
		let remainder = i + init, style
		curXInc = offsetX * oxRange[remainder]
		curYInc = offsetY * oyRange[remainder]
		curSInc = offsetS * osRange[remainder]
		curRInc = offsetR * orRange[remainder]
		curOInc = offsetO * ooRange[remainder]
		curZInc = offsetZ * ozRange[remainder]
		slide.style.transform = `translate(${curXInc}px, ${curYInc}px) scale(${curSInc}) rotate(${curRInc}deg)`
		slide.style.opacity   = curOInc
		slide.style.zIndex    = curZInc
	})
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
