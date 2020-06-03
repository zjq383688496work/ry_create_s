module.exports = ({ host, mockList, mockItem, getMallId }) => {
	let tcPath = `//${host}/mcp-gateway/terminalCategory`,
		cPath  = `//${host}/mcp-gateway/commodity`
	return {
		// 分类列表
		getCategoryList(cb) {
			cb && cb(mockList.goodsCatg(5))
		},
		// 分类商品列表
		getList(size = 10, cb) {
			cb && cb(mockList.goods(size))
		},
		// 推荐商品列表
		getRecGoodsList(cb) {
			var { goods } = mockList
			cb && cb(mockList.reGoods(5))
		},
		// 商品详情
		getGoodsDetails(cb) {
			cb && cb(mockItem.goodsDetails)
		}
		
	}
}