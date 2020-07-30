// 高级组件对应添加子组件
module.exports = {
	text:          { name: '文本内容', type: 'Textarea', max: 1000, placeholder: '右侧编辑内容', autosize: { minRows: 1, maxRows: 6 } },
	text2:         { name: '文本内容', type: 'Textarea', max: 1000, placeholder: '右侧编辑内容', autosize: { minRows: 1, maxRows: 6 } },
	title:         { name: '标题',    type: 'Title',    max: 30 },
	img:           { name: '图片',    type: 'Image' },
	bind:          { name: '字段绑定', type: 'Bind' },
	audio:         { name: '音频',    type: 'Audio' },
	volume:        { name: '音量',    type: 'Slider', min: 0, max: 100, step: 1 },
	loop:          { name: '是否循环', type: 'Checkbox' },
	video:         { name: '视频',    type: 'Video' },
	filterBGImg:   { name: '字母图片', type: 'Image' },
	filterPageImg: { name: '分页图片', type: 'Image' },
	filterPrevImg: { name: '上页图片', type: 'Image' },
	filterNextImg: { name: '下页图片', type: 'Image' },
	pageSwitch:    { name: '分页开关', type: 'Checkbox' },
	highSwitch:    { name: '高亮开关', type: 'Checkbox' },
	prevSwitch:    { name: '上页开关', type: 'Checkbox' },
	nextSwitch:    { name: '下页开关', type: 'Checkbox' },
	numberSwitch:  { name: '数字开关', type: 'Checkbox' },
	posIcon:       { name: '坐标图标', type: 'Image' },
	url:           { name: '网址',    type: 'Url' },
	media:         { name: '媒体',    type: 'Meidia' },
	split:         { name: '分隔符',  type: 'Input', min: 0, max: 5 },
	prefix:        { name: '前缀',    type: 'Input', min: 0, max: 5 },
	suffix:        { name: '后缀',    type: 'Input', min: 0, max: 5 },
	template:      { name: '模板',    type: 'Textarea', min: 0, max: 200, autosize: { minRows: 1, maxRows: 6 } },
	router:        { name: '页面功能', type: 'Router' },
	storeRouter:   { name: '店铺跳转', type: 'Router' },
	publicRouter:  { name: '设施跳转', type: 'Router' },
	goodsRouter:   { name: '商品跳转', type: 'Router' },
	appRouter:     { name: '应用跳转', type: 'Router' },
	switch:        { name: '滑动开关', type: 'Checkbox' },
	pageSwitch:    { name: '翻页开关', type: 'Checkbox' },
	size:          { name: '显示数量', type: 'Number', min: 1, max: 20 },
	file:          { name: '文档',     type: 'File' },
	showTop:       { name: '滚动高度', type: 'Number', min: 0, max: 1000 },
	centerX:       { name: '中点坐标X', type: 'Number', min: 0, max: 500 },
	centerY:       { name: '中点坐标Y', type: 'Number', min: 0, max: 500 },
	direction:     { name: '方向',    type: 'Radio', option: [
		{ name: '水平', value: 'horizontal' },
		{ name: '垂直', value: 'vertical' }
	] },
	turn:          { name: '翻页方向', type: 'Radio', option: [
		{ name: '上一页', value: 'prev' },
		{ name: '下一页', value: 'next' }
	] },
	effect:        { name: '效果',    type: 'RadioMix', option: [
		{ name: '位移切换', value: 'slide' },
		{ name: '淡入', value: 'fade' },
		{ name: '方块', value: 'cube' },
		{ name: '3D流', value: 'coverflow' },
		{ name: '3D翻转', value: 'flip' }
	] },
	autoplay:           { name: '自动播放', type: 'Switch' },
	loop:               { name: '循环播放', type: 'Switch' },
	speed:              { name: '切换速度', type: 'Number', min: 0, max: 2e4, step: 100 },
	delay:              { name: '停留时长', type: 'Number', min: 0, max: 1e4, step: 100 },
	defer:              { name: '延迟时间', type: 'Number', min: 0, max: 100, step: 0.1 },
	slidesPerView:      { name: '显示数量', type: 'Number', min: 1, max: 10 },
	slidesPerGroup:     { name: '滚动数量', type: 'Number', min: 1, max: 10 },
	centeredSlides:     { name: '居中排列', type: 'Switch' },
	spaceBetween:       { name: '图片间距', type: 'Number', min: -500, max: 500 },
	pagination:         { name: '分页器', type: 'Switch' },
	slidesOffsetBefore: { name: '左偏移量', type: 'Number', min: -1000, max: 1000 },
	swiperOptions:      { name: '轮播配置', type: 'Options' },
	mapThemeColor:      { name: '地图主色', type: 'Color' },
	themeColor:         { name: '主题色',   type: 'Color' },
	textColor:          { name: '文本色',   type: 'Color' },
	bgColor:            { name: '背景色',   type: 'Color' },
	dataSource:         { name: '数据来源',    type: 'RadioMix', option: [
		{ name: '基础数据', value: 'base' },
		{ name: 'API', value: 'api' }
	] },
	delayOnly:     { name: '轮播时长',  type: 'Slider', min: 1, max: 30, step: 1 },
	date:          { name: '播放时段',  type: 'Date', min: 0, max: 90 },
	mapZoom:       { name: '缩放',     type: 'Radio', option: [
		{ name: '开启', value: 'on' },
		{ name: '关闭', value: 'off' }
	]},
	positionH:     { name: '水平位置',     type: 'Radio', option: [
		{ name: '左', value: 'left' },
		{ name: '右', value: 'right' }
	]},
	positionV:     { name: '垂直位置',     type: 'Radio', option: [
		{ name: '上', value: 'top' },
		{ name: '下', value: 'bottom' }
	]},

	status:               { name: '状态选择', type: 'Status' },
	// 语音
	voice_default:        { name: '默认', type: 'Status' },
	voice_listen:         { name: '监听', type: 'Status' },
	voice_success:        { name: '成功', type: 'Status' },
	voice_success_null:   { name: '成功(空)', type: 'Status' },
	voice_error_network:  { name: '网络错误', type: 'Status' },
	voice_error_software: { name: '软件错误', type: 'Status' },
	voice_error_hardware: { name: '硬件错误', type: 'Status' },
	voice_error_user:     { name: '用户问题', type: 'Status' },
	onlySwitch:           { name: '唯一跳转', type: 'Switch' },
	// 标签
	tab_default:          { name: '默认', type: 'Status' },
	// 其他
	remarks:              { name: '备注', type: 'Remarks' },
	event:                { name: '事件', type: 'Event' },

	// 缓冲区
	bufferOptions:        { name: '缓冲配置', type: 'Options' },
	indexMultiple:        { name: '索引倍数', type: 'Number', min: 1,   max: 10, step: 1 },
	increment:            { name: '顺序增量', type: 'Number', min: -10, max: 10, step: .1 },
	offsetX:              { name: 'X轴偏移',  type: 'Number', min: -100, max: 100, step: 1 },
	offsetXStr:           { name: 'X轴倍率',  type: 'Input',  min: 0, max: 100 },
	offsetY:              { name: 'Y轴偏移',  type: 'Number', min: -100, max: 100, step: 1 },
	offsetYStr:           { name: 'Y轴倍率',  type: 'Input',  min: 0, max: 100 },
	offsetS:              { name: '缩放',     type: 'Number', min: 0, max: 10,  step: .1 },
	offsetSStr:           { name: '缩放倍率',  type: 'Input',  min: 0, max: 100 },
	offsetR:              { name: '旋转',     type: 'Number', min: 0, max: 359, step: 1 },
	offsetRStr:           { name: '旋转倍率',  type: 'Input',  min: 0, max: 100 },
	offsetT:              { name: '偏移时间',  type: 'Number', min: 0, max: 1e3, step: 50 },
	// 弹幕
	requestCount:         { name: '请求数量', type: 'Number', min: 10, max: 200 },
}