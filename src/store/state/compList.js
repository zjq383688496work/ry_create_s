// 复数类组件元素添加 ()
module.exports = [
	// 基础组件
	{
		icon: 'basicsComponent',
		name: '基础组件',
		child: [
			{
				icon: 'text',
				name: '文本',
				key:  'text'
			},
			{
				icon: 'button',
				name: '按钮',
				key:  'button'
			},
			{
				icon: 'image',
				name: '图片',
				key:  'picture'
			},
			{
				icon: 'image',
				name: '背景色块',
				key:  'area'
			},
			// {
			// 	icon: 'splitLine',
			// 	name: '分割线',
			// 	key:  'splitLine'
			// },
			{
				icon: 'audio',
				name: '音频', 
				key:  'audio'
			},
			{
				icon: 'video',
				name: '视频', 
				key:  'video'
			},
			// {
			// 	icon: 'carousel',
			// 	name: '轮播',
			// 	key:  'swiperImage'
			// },
			/*{
				icon: 'carousel',
				name: '精彩活动',
				key:  'wonderfulActivity'
			},*/
			{
				icon: 'html',
				name: '网页',
				key:  'web'
			},
			{
				icon: 'date&time',
				name: '时间日期',
				key:  'time'
			},
			{
				icon: 'weather',
				name: '天气',
				key:  'weather'
			},
			// {
			// 	icon: 'navigation',
			// 	name: '导航列表',
			// 	key:  'navigation', 
			// },
			{
				icon: 'navigation',
				name: '悬浮导航', 
				key:  'navigationFloat', 
			},
		]
	},
	// 图片/视频
	{
		icon: 'carousel',
		name: '图片/视频',
		key:  'swiperImgAndVideo'
	},
	// 精彩活动
	{
		icon: 'carousel',
		name: '精彩活动',
		key:  'wonderfulActivity2',
		child: [
			{
				icon: 'classifyNav',
				name: '活动分类',
				key:  'catgByActivity2'
			},
			{
				icon: 'list',
				name: '活动列表',
				key:  'listByActivity2'
			},
			{
				icon: 'reset',
				name: '重置',
				key:  'resetByActivity2'
			}
		]
	},
	// 店铺列表
	{
		icon: 'store',
		name: '店铺列表',
		key:  'storeList2',
		child: [
			{
				icon: 'characterNav',
				name: '字母',
				key:  'letterByStore2'
			},
			{
				icon: 'floorNav',
				name: '楼层',
				key:  'floorByStore2'
			},
			{
				icon: 'floorNav',
				name: '楼栋',
				key: 'buildByStore2'
			},
			{
				icon: 'classifyNav',
				name: '分类',
				key:  'catgByStore2'
			},
			{
				icon: 'sorter',
				name: '分页',
				key:  'pageByStore2'
			},
			{
				icon: 'reset',
				name: '重置',
				key:  'resetByStore2'
			},
			{
				icon: 'list',
				name: '列表',
				key:  'listByStore2'
			},
			{
				icon: 'floorMap',
				name: '楼层地图',
				key:  'mapByStore2'
			},
			{
				icon: 'floorMap',
				name: '地图导航',
				key:  'navByStore2'
			},
			{
				icon: 'qrcode_hui',
				name: '惠码',
				key:  'qrcodeHui'
			},
		]
	},
	// 店铺详情
	{
		icon: 'storeDetails',
		name: '店铺详情',
		key:  'storeDetails2',
		child: [
			{
				icon: 'aboutStore',
				name: '信息',
				key:  'storeBlock'
			},
			{
				icon: 'carousel',
				name: '轮播图片',
				key:  'swiperBind'
			},
			{
				icon: 'button',
				name: '前往按钮',
				key:  'button'
			},
			{
				icon: 'qrcode_hui',
				name: '惠码',
				key:  'qrcodeHui'
			},
			{
				icon: 'qrcode_nav',
				name: '导航码',
				key:  'qrcodeNav'
			},
		]
	},
	// 日期天气
	{
		icon: 'dateWeather',
		name: '日期天气',
		key:  'dateWeather',
		child: [
			{
				icon: 'date&time',
				name: '时间日期',
				key:  'time'
			},
			{
				icon: 'weather',
				name: '天气',
				key:  'weather'
			},
			{
				icon: 'image',
				name: '空气质量图标',
				key:  'kongQi'
			},
			{
				icon: 'image',
				name: '风力图标',
				key:  'feng'
			}, 
			{
				icon: 'image',
				name: '湿度图标',
				key:  'shiDu'
			},
			{
				icon: 'splitLine',  
				name: '分割线',
				key:  'line'
			}
		]
	},
	// 语音助手
	{
		icon: 'voice',
		name: '语音助手',
		child: [
			{
				icon: 'text',
				name: '文本',
				key:  'text'
			},
			{
				icon: 'text',
				name: '字段绑定',
				key:  'textBind'
			},
			{
				icon: 'button',
				name: '按钮',
				key:  'button'
			},
			{
				icon: 'button',
				name: '状态按钮',
				key:  'buttonStatus'
			},
			{
				icon: 'button',
				name: '自执行按钮',
				key:  'buttonAuto'
			},
			{
				icon: 'button',
				name: '事件触发器',
				key:  'eventTrigger'
			},
			{
				icon: 'image',
				name: '图片',
				key:  'picture'
			},
			{
				icon: 'image',
				name: '背景色块',
				key:  'area'
			},
			{
				icon: 'audio',
				name: '音频', 
				key:  'audio'
			},
			{
				icon: 'list',
				name: '搜索列表',
				key:  'listByVoice'
			},
		]
	},
	// {
	// 	icon: 'shops',
	// 	name: '商品列表',
	// 	key:  'goodsList',
	// 	child: [
	// 		// {
	// 		// 	icon: 'sorter',
	// 		// 	name: '分页',
	// 		// 	key:  'page'
	// 		// },
	// 		{
	// 			icon: 'reset',
	// 			name: '重置',
	// 			key:  'resetByGoods'
	// 		},
	// 		{
	// 			icon: 'list',
	// 			name: '列表',
	// 			key:  'listByGoods'
	// 		},
	// 		{
	// 			icon: 'classifyNav',
	// 			name: '分类',
	// 			key:  'catgByGoods'
	// 		},
	// 		{
	// 			icon: 'list',
	// 			name: '推荐列表',
	// 			key:  'swiperByGoods'
	// 		}
	// 	]
	// },
	// {
	// 	icon: 'shopDetail',
	// 	name: '商品详情',
	// 	key: 'goodsDetails',
	// 	child: [
	// 		{
	// 			icon: 'carousel',
	// 			name: '信息浮动条',
	// 			key:  'goodsBar'
	// 		},
	// 		{
	// 			icon: 'carousel',
	// 			name: '商品信息',
	// 			key:  'goodsBlock'
	// 		},
	// 		{
	// 			icon: 'classifyNav',
	// 			name: '图片列表-绑定',
	// 			key:  'pictureListBind'
	// 		}
	// 	]
	// },
	
	// {
	// 	icon: 'store',
	// 	name: '标签切换',
	// 	key: 'tabs',
	// 	child: [
	// 		{
	// 			icon: 'carousel',
	// 			name: '标签',
	// 			key:  'catgByTabs'
	// 		},
	// 		{
	// 			icon: 'carousel',
	// 			name: '子元素',
	// 			key:  'childElement'
	// 		}
	// 	]
	// },
	{
		icon: '2DMap',
		name: '2D地图',
		key:  'map2D'
	},
	{
		icon: 'qrcode_index',
		name: '二维码',
		child: [
			{
				icon: 'qrcode',
				name: '二维码',
				key:  'qrcode'
			},
			{
				icon: 'qrcode_hui',
				name: '惠码',
				key:  'qrcodeHui'
			},
			{
				icon: 'qrcode_nav',
				name: '导航码',
				key:  'qrcodeNav'
			},
		]
	},
	// {
	// 	icon: 'html',
	// 	name: '组件上传',
	// 	key:  'html'
	// }
]