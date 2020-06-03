module.exports = ({ host, mockList, mockItem, getMallId }) => {
	let path = `//${host}/kaide-web/mallShop`
	return {
		// 分类列表
		getCategoryList(cb) {
			var { storeCatg, storeFloor, storeBuild } = mockList
			cb && cb({floor: storeFloor(), catg: storeCatg(), build: storeBuild() })
		},
		// 商品列表
		getList(size = 10, cb) {
			var { store } = mockList
			cb && cb(store(size))
		},
		// 推荐商品列表
		getRecList(size = 10, cb) {
			var { store } = mockList
			cb && cb(store(size))
		},
		// 店铺详情
		getDetails(cb) {
			cb && cb(mockItem.storeDetails2)
		},
		// 精彩活动分类 
		getActivityCatg(cb) {
			var { storeActivityCatg } = mockList
			cb && cb({ catg: storeActivityCatg() })
		}
	}
}