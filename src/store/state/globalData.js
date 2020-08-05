const tc = require('./themeContent')

const globalData = {
	// 全局数据
	data: {
		homepage: 'p_1000',			// 首页路由
		backgroundColor: '#fff',		// 全局背景色
		music: {
			url: '',
			volume: 50
		},
		advert: {
			switch: { auth: false, value: false },
			time:   { auth: false, value: 30 },
		},
		voice: {
			switch: { auth: false, value: false },
		},
		loading: {
			web:       { auth: false, value: '' },
			store:     { auth: false, value: '' },
			storeList: { auth: false, value: '' },
			goods:     { auth: false, value: '' },
			goodsList: { auth: false, value: '' },
		},
		language: {
			default: 1,
			list: [
				{ key: 1 },
			]
		},
		composeType:'portrait',
		max: {
			id: 0,
		},
		db: {
			data:  {},
			field: [],
			maxId: 0,
		}
	},
	theme: {
		idx: 0,
		max: {
			color:   0,
			picture: 0
		},
		list: [JSON.parse(JSON.stringify(tc))]
	},
	floors:    [],		// 楼层数据
	catgs:     [],		// 分类数据
	storeList: [],		// 店铺数据
	copyComp:  null,	// 复制组件
	multiComp: {		// 多选组件
		type:   '',
		index:  {},
		list:   []
	},

	// 全局特征 
	feature: { 
		reviewRouter:'p_1000'
	}
}

module.exports = globalData;