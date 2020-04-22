import html2canvas from 'html2canvas'

let domStr,
	iframe,
	images,
	width,
	height,
	composeType,
	callback

export default function snapshot(dm, ct, cb) {
	let { offsetHeight, offsetWidth } = dm
	width  = offsetWidth
	height = offsetHeight
	domStr = dm.outerHTML
	composeType = ct
	callback = cb
	window.addEventListener('message', replaceImage, false)
	initFrame(domStr)
}

// 初始化iframe
function initFrame(domStr, cb) {
	let ifm = iframe = document.createElement('iframe')
	Object.assign(iframe.style, {
		display: 'none',
		width:  0,
		height: 0,
	})
	// ifm.src = 'http://rongyi.b0.rongyi.com/wd/utils/getBase64ByUrlIframe.html'
	ifm.src = 'http://rongyi.b0.rongyi.com/wd/utils/getBase64ByUrlIframePM.html'
	ifm.onload = function() {
		replaceImageStart(domStr, cb)
	}
	document.body.appendChild(iframe)
}

// 获取图片
function replaceImage({ data: imgs }) {
	document.body.removeChild(iframe)
	let div   = document.createElement('div')
	let child = document.createElement('div')
	document.body.appendChild(div)
	div.appendChild(child)
	div.style.opacity = 0
	div.className = `pg-element-${composeType} preview-cover`
	Object.assign(child.style, {
		position: 'absolute',
		width:  width  + 'px',
		height: height + 'px',
	})
	imgs.forEach((img, i) => {
		let org = images[i]
		domStr = domStr.replace(org, img)
	})

	child.innerHTML = domStr

	replaceVideo(child.querySelectorAll('video'))

	setTimeout(() => {
		html2canvas(child).then(canvas => {
			document.body.removeChild(div)
			let imageBase64 = canvas.toDataURL('image/jpeg'),
				dataBase64  = imageBase64.replace(/data:image\/.+;base64,/, '')
			Ajax.postJSON('/easy-smart-web/fileUpload/uploadBase64', {
				fileType: 'jpg',
				dataBase64
			}).then(({ data }) => {
				window.removeEventListener('message', replaceImage)
				callback && callback(data.url)
			}).catch(e => {
				window.removeEventListener('message', replaceImage)
				callback && callback()
			})
		})
	}, 100)
}

// 替换图片
function replaceVideo(videos) {
	if (!videos.length) return
	videos.forEach(video => {
		let { poster } = video
		video.outerHTML = `<img src="${poster}"/>`
	})
}

// 替换图片
function replaceImageStart(domStr, cb) {
	images = domStr.match(/https?:\/\/[^'"]+\.(jpe?g|png|gif|webp)/ig)
	iframe.contentWindow.postMessage(images, '*')
}
