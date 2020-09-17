export function filterContent(data,con) {
	let content = data.data.content;
	const t = data.data.type;
	if( t == "storeInstroInstroduce"||t == "storeInstroTitle"||t == "instroPicture"||t == "instroTitle"){
		content = {}
	}else if(t == "address" || t == "phone"){
		content = {img:content.img}
	}else{
		content = con
	}
	const name = data.name;
	 if(name == 'floor' || name == 'catg'){
	 	content.isShowDom = !content.switch ? 'none' : 'flex'; 
	 }
	return content
} 

// 轮播设置的过滤--商家--大运营
export function setSwiperImgAndVideo(editConfig){
	let { pageContent, globalData } = editConfig,
		{ banner } = globalData
	if (tempCfg.bannerAds == 1) {
		if (!/IV$/.test(banner.name)) {
			let { content } = banner.data
			content.forEach(e => {
				!e.delayOnly && e.type == 'image'? e.delayOnly = 5 : null
				!e.date ? e.date = '' : null
			})
		}
	}
	Object.keys(pageContent).map(_=>{
		let page = pageContent[_],
			elements = page.elements;
		elements.map(val => {
			if (val.name === 'swiperImgAndVideo') {
				let contentList = deepCopy(val.data.content)
				if(getAttr(contentList) != 'Array') return
				contentList.forEach(e => {
					if (!e) return
					let { date, delayOnly, type } = e
					if (!delayOnly && type=='image') {
						e.delayOnly = 5
					}
					if (!date) {
						e.date = ''
					}
				})
				val.data.content = contentList
			}
			return val
		})
	})
}



