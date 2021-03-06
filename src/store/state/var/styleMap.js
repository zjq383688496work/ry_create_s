const bStyleMap = [
	{ name: '实线', value: 'solid' },
	{ name: '双线', value: 'double' },
	{ name: '虚线', value: 'dashed' },
	{ name: '点状', value: 'dotted' }
]

// 高级组件对应添加子组件
module.exports = {
	name: {
		audio:                        '音频',
		image:                        '图片',
		posIcon:                      '图标',
		text:                         '文本',
		title:                        '标题',
		filterBox:                    '盒样式',
		filterFlex:                   '盒布局',
		filter:                       '元素',
		filterActive:                 '激活',
		// filterOffset:                 '偏移样式',
		pageSet:                      '分页设置',
		filterPage:                   '上&下一页',
		PagePrev:                     '上一页',
		PageNext:                     '下一页',
		pagination:                   '分页器',
		paginationActive:             '分页激活',
		paginationBox:                '分页框',
		swiperImage:                  '轮播',
		line:                         '线',
		split:                        '分隔符',
		mainTable:                    '导航Home',
		language:                     '语言',
		language2:                    '语言',
		'::-webkit-scrollbar':        '滚动条',
		'::-webkit-scrollbar-thumb':  '滚动滑块',
	},
	// 定义样式名称 & 渲染类型 & 相关配置
	style: {
		display:           { name: '显示',    type: 'Switch', true: 'block', false: 'none' },
		top:               { name: '上',      type: 'Number', min: -1000, max: 9999 },
		left:              { name: '左',      type: 'Number', min: -1000, max: 9999 },
		width:             { name: '宽',      type: 'Number', min: 0, max: 9999 },
		height:            { name: '高',      type: 'Number', min: 0, max: 9999 },
		lockAspectRatio:   { name: '拉伸比例', type: 'Radio', option: [
			{ name: '任意', value: false },
			{ name: '等比', value: true }
		] },
		lineHeight:        { name: '行高',    type: 'Number' },
		fontSize:          { name: '字号',    type: 'Number', min: 12, max: 180, step: 1 },
		textAlign:         { name: '对齐方式', type: 'Radio', option: [
			{ name: '左', value: 'left' },
			{ name: '中', value: 'center' },
			{ name: '右', value: 'right' }
		] },
		color:             { name: '字体颜色', type: 'Color' },
		fontWeight:        { name: '粗细',    type: 'Switch', true: 'bold',      false: 'normal' },
		fontStyle:         { name: '斜体',    type: 'Switch', true: 'italic',    false: 'normal' },
		textDecoration:    { name: '文本线条',    type: 'Radio', option: [
			{ name: '无', value: 'none' },
			{ name: '下', value: 'underline' },
			{ name: '中', value: 'line-through' },
			{ name: '上', value: 'overline' }
		] },
		opacity:           { name: '透明度',  type: 'Slider', min: 0, max: 1, step: 0.01 },
		backgroundImage:   { name: '背景图',  type: 'BGImage' },
		backgroundColor:   { name: '背景颜色', type: 'Color' },
		backgroundSize:    { name: '背景样式', type: 'Radio', option: [
			{ name: '居中', value: 'contain' },
			{ name: '充满', value: 'cover' },
			{ name: '拉伸', value: '100% 100%' }
		] },
		boxShadow:         { name: '元素阴影', type: 'Complex', child: {
			h_shadow:   { name: 'X偏移', type: 'Number',  min: -100, max: 100 },
			v_shadow:   { name: 'Y偏移', type: 'Number',  min: -100, max: 100 },
			blur_dis:   { name: '模糊度', type: 'Number', max: 120 },
			spread_dis: { name: '大小',  type: 'Number', max: 40 },
			color:      { name: '颜色',  type: 'Color' }
		} },
		textShadow:         { name: '文字阴影', type: 'Complex', child: {
			h_shadow:   { name: 'X偏移', type: 'Number', max: 40 },
			v_shadow:   { name: 'Y偏移', type: 'Number', max: 40 },
			blur_dis:   { name: '模糊度', type: 'Number', max: 40 },
			color:      { name: '颜色',  type: 'Color' }
		} },
		borderRadius:       { name: '圆角', type: 'Complex', child: {
			topLeft:     { name: '上左', type: 'Number', max: 200 },
			topRight:    { name: '上右', type: 'Number', max: 200 },
			bottomLeft:  { name: '下左', type: 'Number', max: 200 },
			bottomRight: { name: '下右', type: 'Number', max: 200 }
		} },
		transform:          { name: '变换', type: 'Complex', child: {
			translateX:   { name: 'X偏移', type: 'Number', max: 40 },
			translateY:   { name: 'Y偏移', type: 'Number', max: 40 },
			scale:        { name: '缩放',  type: 'Number', max: 20, step: 0.2 },
			scaleX:       { name: 'X缩放', type: 'Number', max: 20, step: 0.2 },
			scaleY:       { name: 'Y缩放', type: 'Number', max: 20, step: 0.2 },
			rotate:       { name: '旋转',  type: 'Number', max: 720 },
			rotateX:      { name: 'X旋转', type: 'Number', max: 720 },
			rotateY:      { name: 'Y旋转', type: 'Number', max: 720 },
			skewX:        { name: 'X倾斜', type: 'Number', max: 40 },
			skewY:        { name: 'Y倾斜', type: 'Number', max: 40 }
		} },
		borderTop:         { name: '上边框', type: 'Complex', child: {
			width:   { name: '宽度', type: 'Number', max: 80 },
			style:   { name: '样式', type: 'Radio', option: bStyleMap },
			color:   { name: '颜色', type: 'Color' },
		} },
		borderLeft:         { name: '左边框', type: 'Complex', child: {
			width:   { name: '宽度', type: 'Number', max: 80 },
			style:   { name: '样式', type: 'Radio', option: bStyleMap },
			color:   { name: '颜色', type: 'Color' },
		} },
		borderWidth:       { name: '边框宽度', type: 'Number' },
		borderStyle:       { name: '边框样式', type: 'Radio', option: bStyleMap },
		borderColor:       { name: '边框颜色', type: 'Color' },
		margin:            { name: '外边距', type: 'Complex', child: {
			top:     { name: '上', type: 'Number', min: -600, max: 600 },
			right:   { name: '右', type: 'Number', min: -600, max: 600 },
			bottom:  { name: '下', type: 'Number', min: -600, max: 600 },
			left:    { name: '左', type: 'Number', min: -600, max: 600 }
		} },
		marginTop:         { name: '外边距上', type: 'Number', max: 600 },
		marginRight:       { name: '外边距右', type: 'Number', max: 600 },
		marginBottom:      { name: '外边距下', type: 'Number', max: 600 },
		marginLeft:        { name: '外边距左', type: 'Number', max: 600 },
		padding:           { name: '内边距', type: 'Complex', child: {
			top:     { name: '上', type: 'Number', max: 600 },
			right:   { name: '右', type: 'Number', max: 600 },
			bottom:  { name: '下', type: 'Number', max: 600 },
			left:    { name: '左', type: 'Number', max: 600 }
		} },
		paddingTop:        { name: '内边距上', type: 'Number', max: 600 },
		paddingRight:      { name: '内边距右', type: 'Number', max: 600 },
		paddingBottom:     { name: '内边距下', type: 'Number', max: 600 },
		paddingLeft:       { name: '内边距左', type: 'Number', max: 600 },
		justifyContent:    { name: '对齐方式', type: 'Radio', option: [
			{ name: '左', value: 'flex-start' },
			{ name: '中', value: 'center' },
			{ name: '右', value: 'flex-end' }
		] },
		flexWrap: { name: '元素换行', type: 'Radio', option: [
			{ name: '不换行', value: 'nowrap' },
			{ name: '换行', value: 'wrap' }
		] },
		flexDirection: { name: '元素方向', type: 'Radio', option: [
			{ name: '横向', value: 'row' },
			{ name: '纵向', value: 'column' }
		] },
		textIndent: { name: '缩进', type: 'Number', min: 0, max: 200 },
		overflow: { name: '边界溢出', type: 'Radio', option: [
			{ name: '溢出', value: 'visible' },
			{ name: '隐藏', value: 'hidden' },
			{ name: '滚动', value: 'auto' }
		] },
		overflowX: { name: '横向溢出', type: 'Radio', option: [
			{ name: '溢出', value: 'visible' },
			{ name: '隐藏', value: 'hidden' },
			{ name: '滚动', value: 'auto' }
		] },
		overflowY: { name: '纵向溢出', type: 'Radio', option: [
			{ name: '溢出', value: 'visible' },
			{ name: '隐藏', value: 'hidden' },
			{ name: '滚动', value: 'auto' }
		] },
	}
}