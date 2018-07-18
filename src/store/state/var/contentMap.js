// 高级组件对应添加子组件
module.exports = {
	text:          { name: '文本内容', type: 'Textarea', max: 1000, placeholder: '右侧编辑内容', autosize: { minRows: 1, maxRows: 6 } },
	title:         { name: '标题',    type: 'Title',    max: 30 },
	img:           { name: '图片',    type: 'Image' },
	bind:          { name: '字段绑定', type: 'Bind' },
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
	split:         { name: '分隔符',  type: 'Input', min: 0, max: 5 },
	prefix:        { name: '前缀',    type: 'Input', min: 0, max: 5 },
	suffix:        { name: '后缀',    type: 'Input', min: 0, max: 5 },
	template:      { name: '模板',    type: 'Textarea', min: 0, max: 200, autosize: { minRows: 1, maxRows: 6 } },
	router:        { name: '页面跳转', type: 'Router' },
	switch:        { name: '滑动开关', type: 'Checkbox' },
	pageSwitch:    { name: '翻页开关', type: 'Checkbox' },
	size:          { name: '显示数量', type: 'Number', min: 1, max: 20 },
	file:          { name: '文档',    type: 'File' }
}