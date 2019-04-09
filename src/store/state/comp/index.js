var { authInit } = require('state/common')

// 组件元素数据
var comps = {
	/* 基础组件 */
	// 图片
	picture:               require('./picture'),
	// 轮播图
	swiperImage:           require('./swiperImage'),
	// 轮播图片和视频
	swiperImgAndVideo:     require('./swiperImgAndVideo'),
	bannerHorizontal:      require('./bannerHorizontal'),
	bannerVertical:        require('./bannerVertical'),
	// 精彩活动
	wonderfulActivity:     require('./wonderfulActivity'),
	wonderfulActivity2:    require('./wonderfulActivity2'),					// 新精彩活动
	catgByActivity2:       require('./wonderfulActivity2/content/catg'),		// 活动分类
	listByActivity2:       require('./wonderfulActivity2/content/list'),		// 活动列表
	resetByActivity2:      require('./wonderfulActivity2/content/reset'),		// 重置
	// 文本
	text:                  require('./text'), 
	//按钮 
	button:                require('./button'),  
	// 网页
	web:                   require('./web'),
	// 导航列表
	navigation:            require('./navigation'),
	// 悬浮导航
	navigationFloat:       require('./navigationFloat'),
	// 视频
	video:                 require('./video'),
	// 分割线
	splitLine:             require('./splitLine'),

	// 店铺简介--标题
	storeInstroTitle:      require('./storeInstro/content/storeInstroTitle'), 
	// 店铺简介--详情
	storeInstroInstroduce: require('./storeInstro/content/storeInstroInstroduce'),
	// 店铺简介--轮播
	storeWonderful:        require('./storeInstro/content/storeWonderful'),
	// 店铺简介--竖线
	storeSplitLine:        require('./storeInstro/content/storeSplitLine'),

	// 店铺详情-标题
	instroTitle:           require('./storeDetails/content/instroTitle'),
	// 店铺详情-logo
	instroPicture:         require('./storeDetails/content/instroPicture'),
	// 店铺详情-前往
	instroButton:          require('./storeDetails/content/instroButton'),
	// 地址
	address:               require('./storeDetails/content/address'),
	// 电话 
	phone:                 require('./storeDetails/content/phone'),
	
	// 字母
	letter:                require('./storeList/content/letter'),
	// 楼层
	floor:                 require('./storeList/content/floor'),
	// 分类
	catg:                  require('./storeList/content/catg'),
	// 分页
	page:                  require('./storeList/content/page'),
	// 重置
	reset:                 require('./storeList/content/reset'),
	// 列表 (店铺)
	listByStore:           require('./storeList/content/listByStore'),
	// 楼层地图
	floorMap:              require('./storeList/content/floorMap'),
	// 天气日期
	time:                  require('./dateWeather/content/time'),
	// 天气 
	weather:               require('./dateWeather/content/weather'),
	//天气图标
	kongQi:                require('./dateWeather/content/kongQi'),
	feng:                  require('./dateWeather/content/feng'),
	shiDu:                 require('./dateWeather/content/shiDu'),
	
	/* 业务组件 */
	// 店铺列表
	storeList:             require('./storeList/index'),
	// 店铺详情
	storeDetails:          require('./storeDetails/index'),
	// 店铺简介
	storeInstro:           require('./storeInstro/index'),
	// 日期天气
	dateWeather:           require('./dateWeather/index'),
	// 2d地图组件
	map2D:                 require('./map2D'),
	// 组件上传
	html:                  require('./html'),
	// 图片-绑定
	pictureBind:           require('./pictureBind'),
	// 文本-绑定
	textBind:              require('./textBind'),
	// 轮播-绑定
	swiperBind:            require('./swiperBind'),

	/* 商品 开始 */
	// 商品列表
	goodsList:             require('./goodsList'),
	// 列表&轮播&分类 (商品)
	listByGoods:           require('./goodsList/content/list'),		// 列表
	swiperByGoods:         require('./goodsList/content/swiper'),		// 轮播
	catgByGoods:           require('./goodsList/content/catg'),		// 分类
	resetByGoods:          require('./goodsList/content/reset'),		// 重置
	// 商品详情
	goodsDetails:          require('./goodsDetails'),						// 商品详情
	goodsBar:              require('./goodsDetails/content/goodsBar'),	// 商品条
	goodsBlock:            require('./goodsDetails/content/goodsBlock'),	// 商品信息
	/* 商品 结束 */

	/* 店铺 开始 */
	// 店铺列表
	storeList2:            require('./storeList2'),
	listByStore2:          require('./storeList2/content/list'),		// 列表
	catgByStore2:          require('./storeList2/content/catg'),		// 分类
	pageByStore2:          require('./storeList2/content/page'),		// 分页
	floorByStore2:         require('./storeList2/content/floor'),		// 楼层
	letterByStore2:        require('./storeList2/content/letter'),	// 字母
	resetByStore2:         require('./storeList2/content/reset'),		// 重置
	mapByStore2:           require('./storeList2/content/map'),		// 导航
	// 店铺详情
	storeDetails2:         require('./storeDetails2'),
	storeBlock:            require('./storeDetails2/content/storeBlock'),	// 信息
	/* 店铺 结束 */

	// 背景色块
	area:                  require('./area'),
	// 图片列表-绑定
	pictureListBind:       require('./pictureListBind'),
	// 切换标签
	tabs:                  require('./tabs'),
	// 标签分类
	catgByTabs:            require('./tabs/content/catgByTabs'),
	// 子元素
	childElement:          require('./childElement'),
	// 二维码
	qrcode:                require('./qrcode'),
	// 二维码绑定
	qrcodeBind:            require('./qrcodeBind')
}

Object.keys(comps).map(_ => {
	var c = comps[_]
	comps[_] = authInit(c)
})

module.exports = comps