/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import Color       from 'compEdit/EditCommon/Color'
import { Row, Col, Checkbox, Collapse, Icon, Input, InputNumber, Radio, Select, Switch, Slider } from 'antd'
const  { TextArea } = Input
const  { Panel }    = Collapse
const RadioButton   = Radio.Button
const RadioGroup    = Radio.Group
const Option = Select.Option

import Banner            from './Banner'
import LanguageChange    from './LanguageChange'
import RouterJump        from 'compEdit/EditCommon/RouterJump'
import StatusJump        from 'compEdit/EditCommon/StatusJump'
import EventTrigger      from 'compEdit/EditCommon/EventTrigger'
import AudioUploadComp   from 'compEdit/EditCommon/AudioUploadComp'
import ImageUploadComp   from 'compEdit/EditCommon/ImageUploadComp'
import ImageAndVideoComp from 'compEdit/EditCommon/ImageAndVideoComp'
// import HtmlUpload        from 'compEdit/EditCommon/HtmlUpload'
import CompLayout        from 'compEdit/EditCommon/CompLayout'
import ChildElement      from './ChildElement'
import SwiperImage       from './SwiperImage'
import SwiperImgAndVideo from './SwiperImgAndVideo'
import Navigation        from './Navigation'
import NavigationFloat   from './NavigationFloat'
import Weather           from './Weather'
import WonderfulActivity from './WonderfulActivity'
import ListByActivity2   from './ListByActivity2'
import ListByStore       from './ListByStore'
import ThemeColor        from './ThemeColor'
// import CatgByGoods       from './CatgByGoods'
// import SwiperByGoods     from './SwiperByGoods'
import { filterContent } from './filter'
import * as variable from 'var'

var conMap = variable.contentMap
var { fieldMap, contentFieldFilter, languages } = variable
let {
	indexs: languageIndexs,
	values: languageValues
} = languages
var plMap  = {
	// catgByGoods:   'filter',
	// listByGoods:   'filter',
	// swiperByGoods: 'filterBox',
	// resetByGoods:  'filterBox',
	// goodsBar:      'filter',
	listByStore2:  'filter',
}

import './index.less'

const compContent = (name, data, updateComp, from) => {
	var props  = { data, updateComp, from }
	var render = {
		bannerHorizontal:  <Banner            {...props} />,
		bannerVertical:    <Banner            {...props} />,
		buttonLanguage:    <LanguageChange    {...props} />,
		navigation:        <Navigation        {...props} />,
		navigationFloat:   <NavigationFloat   {...props} />,
		weather:           <Weather           {...props} />,
		wonderfulActivity: <WonderfulActivity {...props} />,
		listByActivity2:   <ListByActivity2   {...props} />,
		swiperImage:       <SwiperImage       {...props} />,
		swiperImgAndVideo: <SwiperImgAndVideo {...props} />,
		listByStore:       <ListByStore       {...props} />,
		map2D:             <ThemeColor        {...props} />,
		floorMap:          <ThemeColor        {...props} />,
		// catgByGoods:       <CatgByGoods       {...props} />,
		// swiperByGoods:     <SwiperByGoods     {...props} />
	} 
	return render[name]
}

class EditContent extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	updateComp = () => {
		let { data, actions, editConfig, from } = this.props
		let { curData, globalData } = editConfig
		let { content } = data.data
		let { parentComp } = curData
		if (from === 'banner') {
			globalData.banner = data
			return actions.updateGlobal(globalData)
		}
		return actions.updateComp(null, parentComp? parentComp: data)
	}

	onChange = (val, con, key, cfg, index) => {
		let { data, actions, editConfig, from } = this.props
		let { curData, globalData } = editConfig
		let { content } = data.data
		let { parentComp } = curData
		val = val > cfg.max ? cfg.max : val 
		con[key] = val
		if (from === 'banner') {
			globalData.banner = data
			return actions.updateGlobal(globalData)
		} 
		return actions.updateComp(null, parentComp? parentComp: data)
	}

	onChangeAuth(val, key) {
		let { data, actions, editConfig, from } = this.props
		let { curData, globalData } = editConfig
		let { parentComp } = curData
		data.auth.content[key] = val
		if (from === 'banner') {
			globalData.banner = data
			return actions.updateGlobal(globalData)
		}
		return actions.updateComp(null, parentComp? parentComp: data)
	}

	deleteCom(index) { 
		let { data, actions, editConfig, from } = this.props
		let { curData, curComp, globalData } = editConfig
		let { content } = data.data
		let { parentComp } = curData
		if (getAttr(content) === 'Array') {
			content = content.filter((item,i) => i!=index)
			data.data.content = content
			if (from === 'banner') {
				globalData.banner = data
				return actions.updateGlobal(globalData)
			}
			return actions.updateComp(null, parentComp? parentComp: data)
		}
	}

	urlCheck(val) {
		var RP = /https?\:\/\/[-\w+&@#/%?=~_|!:,.;]+[-\w+&@#/%=~_|]/
		if (val === '' || RP.test(val)) return ''
		return 'URL格式不正确'
	}
	/* 渲染组件开始 */
	// 文本
	renderTextarea(cfg, con, val, key, index) {
		return (
			<div>
				<TextArea
					min={cfg.min || 0} max={cfg.max || 100}
					placeholder={cfg.placeholder || '右侧编辑内容'}
					autosize={cfg.autosize || false}
					value={val} onChange={v => this.onChange(v.target.value, con, key,cfg, index)}
					style={{ width: '100%' }}
				/>
			</div>
		)
	}
	// 数字
	renderNumber(cfg, con, val, key, index) {
		return (
			<InputNumber
				min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
				value={val} onChange={v => this.onChange(v, con, key,cfg, index)}
				style={{ width: '100%' }}
			/>
		)
	}
	renderSlider(cfg, con, val, key, index) {
		return (
			<Slider
				min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
				value={val} onChange={v => this.onChange(v, con, key,cfg, index)}
				style={{ width: '100%' }}
			/>
		)
	}
	// 标题
	renderTitle(cfg, con, val, key, index) {
		return (
			<Input
				min={cfg.min || 0} max={cfg.max || 100}
				value={val} onChange={v => this.onChange(v.target.value, con, key,cfg, index)}
				style={{ width: '100%' }}
			/>
		)
	} 
	// 跳转路由
	renderRouter(cfg, con, val, key, index) {
		let { data, actions, from } = this.props
		return (
			<RouterJump data={data} content={val} actions={actions} from={from} />
		)
	}
	// 切换状态
	renderStatus(cfg, con, val, key, index) {
		let { data, actions } = this.props
		return (
			<StatusJump data={data} content={val} actions={actions} />
		)
	}
	// 事件触发
	renderEvent(cfg, con, val, key, index) {
		let { data, actions } = this.props
		return (
			<EventTrigger data={data} content={val} actions={actions} />
		)
	}
	// 上传音频
	renderAudio(cfg, con, val, key, index) {
		let { data } = this.props
		return (
			<AudioUploadComp
				data={data}
				img={val}
				name={key}
				action={'updateComp'}
				style={{ width: '100%' }}
				index={index}
			/>
		)
	}
	// 上传图片
	renderImage(cfg, con, val, key, index) {
		let { data } = this.props
		return (
			<ImageUploadComp
				data={data}
				img={val}
				name={key}
				action={'updateComp'}
				style={{ width: '100%' }}
				index={index}
			/>
		)
	}
	// 上传视频
	renderVideo(cfg, con, val, key, index) {
		let { data } = this.props
		return (
			<ImageUploadComp
				data={data}
				img={val}
				name={`video`}
				action={'updateComp'}
				style={{ width: '100%' }}
				index={index}
			/>
		)
	}
	// 图片视频
	renderImgAndVideo(cfg, con, val, key, index) { 
		let { data, from } = this.props
		return (
				<ImageAndVideoComp
					data={data}
					action={'updateComp'}
					img={val}
					con={con}
					style={{ width: '100%' }}
					index={index}
					from={from}
				/>
			)
	}
	// 上传组件
	// renderFile(cfg, con, val, key, index) {
	// 	return (
	// 		<HtmlUpload
	// 			data={val}
	// 			style={{ width: '100%' }}
	// 			onChange={v => this.onChange(v, con, key,cfg, index)}
	// 		/>
	// 	)
	// }
	// 网址
	renderUrl(cfg, con, val, key, index) {
		return (
			<div>
				<TextArea
					minLength={cfg.min || 0} maxLength={cfg.max || 10000}
					autosize={cfg.autosize || false}
					defaultValue={val} onBlur={v => this.onChange(v.target.value, con, key,cfg, index)}
					style={{ width: '100%' }}
				/>
				<p style={{ color: 'red', marginTop: 5 }}>{ this.urlCheck(val) }</p>
			</div>
		)
	}
	// 文本
	renderInput(cfg, con, val, key, index) {
		return (
			<Input
				minLength={cfg.min || 0} maxLength={cfg.max || 100}
				defaultValue={val} onChange={v => this.onChange(v.target.value, con, key,cfg, index)}
				style={{ width: '100%' }}
			/>
		)
	}
	// 颜色
	renderColor = (cfg, con, val, key, index) => {
		let { data } = this.props
		return (
			<Color
				data={data}
				color={val}
				action={'updateComp'}
				placement="bottomLeft"
			/>
		)
	}
	// 开关
	renderCheckbox(cfg, con, val, key, index) {
		return (
			<Checkbox
				checked={val || cfg.defaultValue || false} onChange={v => this.onChange(v.target.checked, con, key, cfg, index)}
			/>
		)
	}
	renderSwitch(cfg, con, val, key, index) {
		return (
			<Switch
				size="small"
				checked={val || false} onChange={v => this.onChange(v, con, key, cfg, index)}
			/>
		)
	}
	// 备注
	renderRemarks(cfg, con, val, key, index) {
		let { color = '#ccc', text } = val
		if (!text) return null
		return (
			<span
				style={{ color }}
				dangerouslySetInnerHTML={{ __html: text }}
			></span>
		)
	}
	// 筛选框
	renderRadio(cfg, con, val, key, index) {
		let { option } = cfg
		return (
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value, con, key, cfg, index)} value={val}>
				{ option.map((_, i) => (<RadioButton key={i} value={_.value}>{_.name}</RadioButton>)) }
			</RadioGroup>
		)
	}
	// 筛选框
	renderRadioMix(cfg, con, val, key, index) {
		let { option } = cfg
		return (
			<div className="sc-radio-group">
				{ option.map((_, i) => (
					<span
						key={i}
						className={`sc-radio-button-wrapper${val === _.value? ' s-active': ''}`}
						value={_.value}
						onClick={e => this.onChange(_.value, con, key, cfg, index)}
					>{_.name}</span>
				)) }
			</div>
		)
	}
	// 绑定
	renderBind(cfg, con, val, key, index) {
		let { data, editConfig } = this.props
		let { parentComp } = editConfig.curData
		if (!parentComp) return
		let map = fieldMap[parentComp.name]
		if (!map) return
		let opts = Object.keys(map).map((_, i) => {
			return <Option key={i} value={_}>{map[_]}</Option>
		})
		return (
			<div>
				<Select
					value={val}
					style={{ width: '100%' }}
					onChange={v => this.onChange(v, con, key, cfg, index)}
				>
					<Option value={''}>无</Option>
					{ opts }
				</Select>
			</div>
		)
	}
	// 复合
	renderOptions(cfg, con, val, key, index) {
		const keys      = Object.keys(val)
		const childNode = keys.map((_, i) => {
			if (_ === 'name') return null
			let v  = val[_],
				cm = conMap[_],
				fn = this[`render${cm.type}`],
				dom = fn.bind(this, cm, val, v, _)()
			return (
				<div className="pgs-row" key={i}>
					<div className="pgsr-name" style={{ width: 52 }}>{ cm.name }</div>
					<div className="pgsr-ctrl">{ dom }</div>
				</div>
			)
		})

		return (
			<div>{ childNode }</div>
		)
	}

	renObj(data, content, index) {
		var { from, editConfig } = this.props,
			{ name } = data,
			cons = data.data.content
		content = filterContent(data, content)
		let ci = 0
		let childNode = Object.keys(content).map((p, i) => {
			if (!conMap[p] || contentFieldFilter[envType][p]) return false
			var cm     = p === 'img' && content.type === 'video'? conMap['video']: conMap[p],
				cname  = cm.name,
				type   = (name === 'swiperImgAndVideo' || from === 'banner') && p === 'img'? 'ImgAndVideo': cm.type,
				val    = content[p],
				render = this[`render${type}`]
			if (!render) return null
			// 根据样式类型渲染对应组件
			let dom = this[`render${type}`].bind(this, cm, content, val, p, index)()

			// 判断文本内容名称
			if (cname === '文本内容') {
				let { list } = editConfig.globalData.data.language,
					len = list.length
				if (len > 1) {
					let [ text1, text2 ] = list
					if (p === 'text')  cname = languageIndexs[text1.key]
					else if (p === 'text2') {
						cname = languageIndexs[text2.key]
						if (!cname) return null
					}
				} else {
					if (p === 'text2') return null
				}
			}

			ci++
			return (
				<div className="pgs-row" key={i} style={{display:`${content.isShowDom && (p == 'size' || p == 'pageSwitch')? content.isShowDom: 'flex'}`}}>
					<div className="pgsr-name">{ cname }</div>
					<div className="pgsr-ctrl">{ dom }</div>
					<div className="pgsr-auth">
						<Checkbox checked={data.auth.content[p] || false} onChange={_ => this.onChangeAuth(_.target.checked, p)} />
					</div>
					{
						(name != 'picture' && cm.name == '图片') || (p == 'img' && cm.name == '视频')
						?
						from === 'banner' && cons.length < 2
						?
						null
						:
						<div className="delete" onClick={() => this.deleteCom(index)}><Icon type="close-circle" style={{ fontSize: 18 }} /></div>
						: null
					} 
				</div> 
			)
		})
		if (!ci) return false
		return childNode
	}
	createMock(cn, da) {
		var obj = {}
		if (da) obj.layout = plMap[cn]? da.style[plMap[cn]]: da.layout
		return obj
	}
	render() {
		let { data, editConfig, from } = this.props
		let { language } = editConfig.globalData.data
		let compName = data.name
		if (!compName) return false
		let { curData } = editConfig
		let { parentComp } = curData
		let da = data.data
		let { content } = da
		let compLay = da.componentLayout
		let mockData = {}
		let childNode,
			activeKey,
			feature,
			compCon = compContent(compName, this.props, this.updateComp, from)

		if (content.length) {
			activeKey = Array.from(new Array(content.length), (_, i) => `${i}`)
			childNode = content.map((_, i) => {
				return ( 
					<Panel header={`内容${i + 1} ${compName === 'swiperImgAndVideo' && i === 0? '(建议为图片)': ''}`} key={`${i}`}> 
						{ this.renObj(data, _, i) }       
					</Panel>
				)
			})
		} else {
			activeKey = ['0']
			let con = this.renObj(data, content)
			childNode = (
				con.length
				? 
				<Panel header={`内容编辑 id: ${data._id || data.name}`} key={0}>
					{ con }
				</Panel>
				: null
			)
		}
		if (parentComp) mockData = this.createMock(compName, da)
		return (
			<section className="ry-roll-screen-config">
				{
					compLay
					?
					<Collapse defaultActiveKey={['0', '1']}>
						<Panel header={`编辑布局`} key={0}>
							<CompLayout props={this.props} layout={compLay} parentLayout={mockData.layout} styleName={plMap[compName]} updateComp={this.updateComp} />
						</Panel>
						<Panel header={`子元素`} key={1}>
							<ChildElement name={compName} layout={compLay} updateComp={this.updateComp} language={language} />
						</Panel>
					</Collapse>
					: null
				}
				{ compCon }
				<Collapse defaultActiveKey={activeKey} activeKey={activeKey}>
					{ childNode }
				</Collapse>
			</section>
		)
	}
}

EditContent.defaultProps = {}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditContent)
