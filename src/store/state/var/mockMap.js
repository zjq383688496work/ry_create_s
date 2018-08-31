let { rn, deepCopy } = require('state/common')
const cdnUrl = 'http://rongyi.b0.upaiyun.com/commodity/text'
const pics = [
	'201808271739138841',
	'201808271739139870',
	'201808271739140771',
	'201808271739141416',
	'201808271739142502'
]
// 高级组件对应添加子组件
var Item = {
	goods: {
		id:       1,
		currentPrice:  `9925.0`,
		originalPrice: `9799.9`,
		commodityName: 'TELEFLORA 11朵粉紫玫瑰七夕花束预定',
		commodityPicList: [
			`${cdnUrl}/${pics[rn(5)]}.png`,
			`${cdnUrl}/${pics[rn(5)]}.png`,
			`${cdnUrl}/${pics[rn(5)]}.png`
		],
		qrcode: `${cdnUrl}/201808271756227480.png`
	},
	reGoods: {
		id: 1,
		currentPrice:  `9925.0`,
		originalPrice: `9799.9`,
		commodityName: `商品-1`,
		showPicList: [
			`${cdnUrl}/${pics[rn(5)]}.png`,
			`${cdnUrl}/${pics[rn(5)]}.png`,
			`${cdnUrl}/${pics[rn(5)]}.png`
		],
		recommendReason: `推荐理由`,
		qrcode: `${cdnUrl}/201808271756227480.png`
	},
	goodsCatg: {
		categoryId:   -1,
		categoryName: `运动`,
		url:  `${cdnUrl}/201807191807420161.jpg`
	},
	store: {
		id:       1,
		logo:     `${cdnUrl}/201805311433385479.png`,
		pictures: new Array(5).fill().map(_ => `${cdnUrl}/${pics[rn(5)]}.png`),
		praiseAmount: rn(1e4),
		name:      `优衣库/UNIQLO`,
		qrcode:    'http://www.rongyi.com',
		berthNumber: 'L1=199',
		contact:   '021-88888888',
		description: 'A|X Armani Exchange是全球主导时尚和高级消费品的Armani集团旗下品牌。 A|X Armani Exchange代表都会年青及时尚品味，不论剪裁、衣料、感觉和轮廓，都尽显Armani的时装智慧，展现都会的时尚。'
	},
	storeCatg: {
		id:   1,
		name: `运动`
	},
	storeFloor: {
		id:   1,
		name: `L1`
	},
	storeLetter: {
		name: 'A'
	},
	storePage: {
		name: `1`
	}
}
module.exports = {
	list: {

	},
	item: {
		listByGoods:     deepCopy(Item.goods),
		swiperByGoods:   deepCopy(Item.reGoods),
		catgByGoods:     deepCopy(Item.goodsCatg),
		goodsDetails:    deepCopy(Item.goods),
		goodsBar:        deepCopy(Item.goods),
		goodsBlock:      deepCopy(Item.goods),
		pictureListBind: deepCopy(Item.goods),
		listByStore2:    deepCopy(Item.store),
		catgByStore2:    deepCopy(Item.storeCatg),
		floorByStore2:   deepCopy(Item.storeFloor),
		letterByStore2:  deepCopy(Item.storeLetter),
		pageByStore2:    deepCopy(Item.storePage),
		storeDetails2:   deepCopy(Item.store),
		storeBlock:      deepCopy(Item.store),
		swiperBind:      deepCopy(Item.store),
	}
}