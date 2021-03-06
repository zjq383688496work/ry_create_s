let { deepCopy } = require('state/common')
// 高级组件对应添加子组件
var Map = {
	// goods: {
	// 	currentPrice:     '现价',
	// 	originalPrice:    '原价',
	// 	commodityName:    '商品名称',
	// 	commodityPicList: '商品图片',
	// 	qrcode:           '二维码'
	// },
	// reGoods: {
	// 	currentPrice:    '现价',
	// 	originalPrice:   '原价',
	// 	commodityName:   '商品名称',
	// 	recommendReason: '推荐理由',
	// 	showPicList:     '轮播图列表',
	// 	qrcode:          '二维码'
	// },
	// goodsCatg: {
	// 	categoryName: '分类名称',
	// 	url:          '分类图片'
	// },
	store: {
		logo:         'LOGO',
		name:         '店铺名称',
		enName:       '店铺英文名',
		berthNumber:  '楼层名称',
		buildNumber:  '楼栋名称',
		description:  '店铺描述',
		pictures:     '店铺图片',
		praiseAmount: '点赞数',
		contact:      '联系方式',
		qrcode:       '二维码',
		categories:   '分类名称',
		otherPic:     '其他图片',
	},
	storeCatg: {
		name: '店铺类型'
	},
	storeCatgSec: {
		name: '二级分类'
	},
	storeFloor: {
		name: '楼层名称'
	},
	storeBuild: {
		name: '楼栋名称'
	},
	storeLetter: {
		name: '名称'
	},
	storePage: {
		name: '名称'
	},
	activityCatg: {
		name: '活动分类'
	},
	activityList: {},
	voice: {
		keyword: '关键字',
		result:  '对话内容',
	}
}
module.exports = {
	// listByGoods:     deepCopy(Map.goods),
	// swiperByGoods:   deepCopy(Map.reGoods),
	// catgByGoods:     deepCopy(Map.goodsCatg),
	// goodsBar:        deepCopy(Map.goods),
	// goodsBlock:      deepCopy(Map.goods),
	// pictureListBind: deepCopy(Map.goods),
	listByStore2:    deepCopy(Map.store),
	recListByStore2: deepCopy(Map.store),
	catgByStore2:    deepCopy(Map.storeCatg),
	catgSecByStore2: deepCopy(Map.storeCatgSec),
	floorByStore2:   deepCopy(Map.storeFloor),
	buildByStore2:   deepCopy(Map.storeBuild),
	letterByStore2:  deepCopy(Map.storeLetter),
	pageByStore2:    deepCopy(Map.storePage),
	navByStore2:     deepCopy(Map.store),
	storeBlock:      deepCopy(Map.store),
	storeDetails2:   deepCopy(Map.store),
	// swiperBind:      deepCopy(Map.store),
	catgByActivity2: deepCopy(Map.activityCatg),
	// listByActivity:  deepCopy(Map.activityList),
	voice:           deepCopy(Map.voice)
}