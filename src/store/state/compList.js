// 复数类组件元素添加 ()
module.exports = [
	// 基础组件
	{
		icon: 'base',
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
				icon: 'button',
				name: '语言按钮',
				key:  'buttonLanguage'
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
				icon: 'video',
				name: '视频', 
				key:  'video'
			},
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
				key:  'weather',
			},
			{
				icon: 'navigation',
				name: '悬浮导航', 
				key:  'navigationFloat',
			},
			{
				icon: 'text',
				name: '弹幕',
				key:  'biubiubiu',
			}
		]
	},
	// 图片/视频 (作废)
	// {
	// 	icon: 'carousel',
	// 	name: '图片/视频',
	// 	key:  'swiperImgAndVideo'
	// },
	// 视图轮播
	{
		icon: 'media',
		name: '视图轮播',
		key:  'swiperIV'
	},
	// 高级视图轮播
	{
		icon: 'media',
		name: '高级视图',
		key:  'advancedIV',
		child: [
			{
				icon: 'media',
				name: '轮播列表',
				key:  'swiperBlockByIV'
			},
			{
				icon: 'button',
				name: '全屏按钮',
				key:  'buttonFullScreenByIV'
			},
			{
				icon: 'page',
				name: '分页',
				key:  'pageByIV'
			},
			{
				icon: 'sorter',
				name: '翻页',
				key:  'turnByIV'
			},
			{
				icon: 'text',
				name: '字段绑定',
				key:  'textBind'
			},
		]
	},
	// 精彩活动
	// {
	// 	icon: 'activity',
	// 	name: '精彩活动',
	// 	key:  'wonderfulActivity2',
	// 	child: [
	// 		{
	// 			icon: 'classifyNav',
	// 			name: '活动分类',
	// 			key:  'catgByActivity2'
	// 		},
	// 		{
	// 			icon: 'list',
	// 			name: '活动列表',
	// 			key:  'listByActivity2'
	// 		},
	// 		{
	// 			icon: 'reset',
	// 			name: '重置',
	// 			key:  'resetByActivity2'
	// 		}
	// 	]
	// },
	{
		icon: 'activity',
		name: '精彩活动',
		key:  'activity',
		child: [
			// {
			// 	icon: 'classifyNav',
			// 	name: '进行时',
			// 	key:  'progressByActivity'
			// },
			// {
			// 	icon: 'reset',
			// 	name: '重置',
			// 	key:  'resetByActivity'
			// },
			{
				icon: 'reset',
				name: '跳转按钮',
				key:  'buttonByActivity'
			},
			{
				icon: 'list',
				name: '活动展示',
				key:  'viewByActivity'
			},
			{
				icon: 'list',
				name: '活动列表',
				key:  'listByActivity'
			},
			{
				icon: 'image',
				name: '背景色块',
				key:  'area'
			},
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
				icon: 'classifyNav',
				name: '二级分类',
				key:  'catgSecByStore2'
			},
			{
				icon: 'sorter',
				name: '分页',
				key:  'pageByStore2'
			},
			{
				icon: 'sorter',
				name: '翻页',
				key:  'turnByStore2'
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
				icon: 'list',
				name: '推荐列表',
				key:  'recListByStore2'
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
				icon: 'button',
				name: '可见开关',
				key:  'visibleByStore2'
			},
			{
				icon: 'image',
				name: '可见图片',
				key:  'pictureByStore2'
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
		icon: 'storeDetail',
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
	// 滚动列表
	{
		icon: 'list',
		name: '滚动列表',
		key:  'scrollList',
		child: [
			{
				name: '列表',
				key: 'listByScroll'
			}
		]
	},
	// 日期天气
	{
		icon: 'weather',
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
	// 标签切换
	{
		icon: 'tabs',
		name: '标签切换',
		key: 'tabs',
		child: [
			{
				icon: 'carousel',
				name: '标签',
				key:  'tabByTabs'
			},
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
			{
				icon: 'video',
				name: '视频', 
				key:  'video'
			},
			{
				icon: 'carousel',
				name: '视图轮播',
				key:  'swiperIV'
			},
		]
	},
	// 地图
	{
		icon: 'map',
		name: '地图',
		child: [
			{
				icon: '2DMap',
				name: '2D地图',
				key:  'map2D',
			},
			{
				icon: '2DMap',
				name: '3D地图',
				key:  'map3D',
			}
		]
	},
	// 二维码
	{
		icon: 'qrcode',
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
			{
				icon: 'qrcode_nav',
				name: '弹幕码',
				key:  'qrcodeBarrage'
			}
		]
	},
]