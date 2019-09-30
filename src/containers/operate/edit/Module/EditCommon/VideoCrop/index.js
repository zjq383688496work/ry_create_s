import { message } from 'antd'

var previewUrl = 'http://rongyi.b0.rongyi.com/commodity/text/201811081000076071.png'

export default function(file, fn, mallId) {
	return getInfo(file)
	.then(function({ preview, originalSizePreview, videoWidth, videoHeight }) {
		var format = file.name.split('.')
		var data = {
			attribute: `${videoWidth}*${videoHeight}`,
			format: format[format.length - 1],
			name: file.name,
			size: file.size,
			type: 2,
			requestType: 1,
			preview,
			originalSizePreview,
		}

		if (mallId) Object.assign(data, { requestType: 2, mallId })
		
		var videoFile = new FormData()
		videoFile.append('file', file, file.name)
		// 前端发送资源的基本信息到后端， 后端返回上传文件需要的参数(authorization, policy)以及资源Id
		Ajax.postVIDEO('/easy-smart-web/fileUpload/uploadFile', videoFile, mallId).then(res => {
			data.url = res.result.data
			console.log('data: ', JSON.stringify(data))
			Ajax.postJSON('/easy-smart-web/merchantSource/saveMerchantSource', data)
				.then(res => fn && fn(true))
				.catch(err => fn && fn(false))
		})
	})
}
/**
 * [getBase64ByVideo description]
 * @param  {[type]} url       [description]
 * @param  {[type]} picWidth  [description]
 * @param  {[type]} picHeight [description]
 * @return {[type]}           [description]
 */
function getBase64ByVideo(file, picWidth, picHeight) {
	return new Promise(function(resolve, reject) {
		var video = document.createElement('video');
		video.onloadeddata = function(e) {
			var width = video.videoWidth;
			var height = video.videoHeight;
			//后台展示图片绘制
			var canvas = document.createElement('canvas');
			var context = canvas.getContext('2d');
			// 原始图片大小的绘制
			var canvas_origin = document.createElement('canvas');
			var context_origin = canvas_origin.getContext('2d');
			// 绘制图片到canvas
			if (picWidth && picHeight) {
				// canvas绘制
				canvas.width = picWidth;
				canvas.height = picHeight;

				canvas_origin.width = width;
				canvas_origin.height = height;
				// 画布清除
				context.clearRect(0, 0, picWidth, picHeight);
				context.drawImage(video, 0, 0, width, height, 0, 0, picWidth, picHeight);

				context_origin.clearRect(0, 0, width, height);
				context_origin.drawImage(video, 0, 0, width, height,0, 0, width, height);

			} else {
				// canvas绘制
				canvas.width = width;
				canvas.height = height;

				canvas_origin.width = width;
				canvas_origin.height = height;
				// 画布清除
				context.clearRect(0, 0, width, height);
				context.drawImage(video, 0, 0, width, height);

				context_origin.clearRect(0, 0, width, height);
				context_origin.drawImage(video, 0, 0, width, height);
			}
			resolve({
				canvas,
				canvas_origin,
				width,
				height
			});
		}
		video.onerror = reject
		video.src = getObjectURL(file)
		
	})
}

/**
 * [getObjectURL description]
 * @param  {[type]} file       [description]
 */
function getObjectURL(file) {
  var url = null;
  if (window.createObjcectURL != undefined) {
	url = window.createOjcectURL(file);
  } else if (window.webkitURL != undefined) {
	url = window.webkitURL.createObjectURL(file);
  } else if (window.URL != undefined) {
	url = window.URL.createObjectURL(file);
  }
  return url;
}

/**
 * [getInfo description]
 * @param  {[type]} file      [description]
 * @param  {[type]} picWidth  [description]
 * @param  {[type]} picHeight [description]
 * @return {[type]}           [description]
 */
function getInfo(file) {
	return new Promise(function(resolve, reject) {
		var reader = new FileReader(),
			videoWidth,
			videoHeight,
			dataUrlBase64,
			preview,
			originalSizePreview

		reader.addEventListener('load', function() {
			getBase64ByVideo(file, 120, 90)
				.then(function(res) {
					videoWidth  = res.width
					videoHeight = res.height
					return {
						show:   res.canvas.toDataURL(),
						origin: res.canvas_origin.toDataURL()
					}
				})
				.then(base64 => {
					dataUrlBase64 = base64
					var showImg = new FormData(),
						show    = dataURLtoFile(dataUrlBase64.show)
					showImg.append('file',   show)
					return videCropImg(showImg)
				})
				.then(url => {
					preview = url
					var originImg = new FormData(),
						origin    = dataURLtoFile(dataUrlBase64.origin)
					originImg.append('file', origin)
					return videCropImg(originImg)
				})
				.then(url => {
					originalSizePreview = url
					resolve({ preview, originalSizePreview, videoWidth, videoHeight })
				})
		}, false)

		reader.addEventListener('error', reject, false)

		if (file) {
			reader.readAsDataURL(file)
		} else {
			reject()
		}
	})

}
// 上传首帧图片
function videCropImg(data) {
	return new Promise(resolve => {
		Ajax.postVIDEO('/easy-smart-web/fileUpload/uploadFile', data).then(({ result, success }) => {
			if (success && result) {
				var url = result.data || previewUrl
				resolve(url)
			} else {
				message.info('首帧图片上传失败!')
				resolve(previewUrl)
			}
		})
	})
}
function dataURLtoFile (dataurl, filename = 'file') {
	let arr = dataurl.split(',')
	let mime = arr[0].match(/:(.*?);/)[1]
	let suffix = mime.split('/')[1]
	let bstr = atob(arr[1])
	let n = bstr.length
	let u8arr = new Uint8Array(n)
	while (n--) {
	  u8arr[n] = bstr.charCodeAt(n)
	}
	return new File([u8arr], `${filename}.${suffix}`, {type: mime})
  }
