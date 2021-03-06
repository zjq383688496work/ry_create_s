import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import Color       from 'compEdit/EditCommon/Color'
import { Row, Col, Card, Checkbox, Collapse, Icon, Input, InputNumber, Radio, Select, Switch,Slider } from 'antd'
const  { TextArea } = Input
const  { Panel }    = Collapse
const Option        = Select.Option
const RadioButton   = Radio.Button
const RadioGroup    = Radio.Group

import Banner            from 'compEdit/EditContent/Banner'
import LanguageChange    from 'compEdit/EditContent/LanguageChange'
import RouterJump        from 'compEdit/EditCommon/RouterJump'
import StatusJump        from 'compEdit/EditCommon/StatusJump'
import VisibleSwitch     from 'compEdit/EditCommon/VisibleSwitch'
import CompChildBind     from 'compEdit/EditCommon/CompChildBind'
import ImageUploadComp   from 'compEdit/EditCommon/ImageUploadComp'
import ImageAndVideoComp from 'compEdit/EditCommon/ImageAndVideoComp'
import IV                from 'compEdit/EditCommon/IV'
import DatePickerRY      from 'compEdit/EditContent/DatePickerRY'
import SwiperImage       from 'compEdit/EditContent/SwiperImage'
import SwiperImgAndVideo from 'compEdit/EditContent/SwiperImgAndVideo'
import Navigation        from 'compEdit/EditContent/Navigation'
import NavigationFloat   from 'compEdit/EditContent/NavigationFloat'
import WonderfulActivity from 'compEdit/EditContent/WonderfulActivity'
import CatgByGoods       from 'compEdit/EditContent/CatgByGoods'
import SwiperByGoods     from 'compEdit/EditContent/SwiperByGoods'
import * as variable from 'var'

import RelComp           from 'compEdit/EditCommon/RelComp'

var conMap   = variable.contentMap,
	fieldMap = variable.fieldMap,
	compMap  = variable.compMap.name,
	compNum  = variable.compMap.num

import './index.less'

const compContent = (name, data, updateComp, editConfig, from) => {
	var props  = { data, updateComp, editConfig, from }
	var render = {
		bannerHorizontal:  <Banner            {...props} />,
		bannerVertical:    <Banner            {...props} />,
		buttonLanguage:    <LanguageChange    {...props} />,
		navigation:        <Navigation        {...props} />,
		navigationFloat:   <NavigationFloat   {...props} />,
		wonderfulActivity: <WonderfulActivity {...props} />,
		swiperImage:       <SwiperImage       {...props} />,
		swiperImgAndVideo: <SwiperImgAndVideo {...props} />,
		catgByGoods:       <CatgByGoods       {...props} />,
		swiperByGoods:     <SwiperByGoods     {...props} />
	}
	return render[name]
}

class EditContent extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	updateComp = () => {
		let { data, actions, editConfig } = this.props
		let { curData } = editConfig
		let { content } = data.data
		let { parentComp } = curData
		actions.updateComp(null, parentComp? parentComp: data)
	}
	onChange = (val, key, obj, index) => {
		let { data, actions, editConfig, from } = this.props
		let { curData, globalData } = editConfig
		let { content } = data.data
		let { parentComp } = curData
		obj[key] = val
		if(index != undefined && getAttr(content) == 'Array') content[index] = obj;
		if(from && from === 'banner'){
			globalData.banner = data
			return actions.updateGlobal(globalData)
		}
		return actions.updateComp(null, parentComp? parentComp: data)
	}

	onChangeAuth(val, key) {
		let { data, actions, editConfig } = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		data.auth.content[key] = val
		actions.updateComp(null, parentComp? parentComp: data)
	}

	deleteCom(index) { 
		let { data, actions, editConfig } = this.props
		let { curData, curComp } = editConfig
		let { content } = data.data
		let { parentComp } = curData
		if(getAttr(content) === 'Array') {
			content = content.filter((item,i) => i!=index)
			data.data.content = content
			actions.updateComp(null, parentComp? parentComp: data)
		}
	}

	urlCheck(val) {
		var RP = /https?\:\/\/[-\w+&@#/%?=~_|!:,.;]+[-\w+&@#/%=~_|]/
		if (val === '' || RP.test(val)) return ''
		return 'URL格式不正确'
	}
	/* 渲染组件开始 */
	// 文本
	renderTextarea(cfg, data, obj, val, key, index) {
		return (
			<TextArea
				min={cfg.min || 0} max={cfg.max || 100}
				placeholder={cfg.placeholder || '右侧编辑内容'}
				autosize={cfg.autosize || false}
				value={val} onChange={v => this.onChange(v.target.value, key, obj, index)}
				style={{ width: '100%' }}
			/>
		)
	}
	// 数字
	renderNumber(cfg, data, obj, val, key, index) {
		return (
			<InputNumber
				min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
				value={val} onChange={v => this.onChange(v, key, obj, index)}
				style={{ width: '100%' }}
			/>
		)
	} 
	// 标题
	renderTitle(cfg, data, obj, val, key, index) {
		return (
			<Input
				min={cfg.min || 0} max={cfg.max || 100}
				value={val} onChange={v => this.onChange(v.target.value, key, obj, index)}
				style={{ width: '100%' }}
			/>
		)
	} 
	// 日期范围
	renderDate(cfg, data, obj, val, key, index) {
		let defaultValue = val ? JSON.parse(val) : ''
		return (<DatePickerRY defaultValue={defaultValue} onChange={value=> this.onChange(value, key, obj, index)}></DatePickerRY>)
	}
	// 跳转路由
	renderRouter(cfg, data, obj, val, key, index) {
		let { actions, from } = this.props
		return (
			<RouterJump data={data} content={val} actions={actions} index={index} from={from} />
		)
	}
	// 切换状态
	renderStatus(cfg, data, obj, val, key, index) {
		let { actions } = this.props
		return (
			<StatusJump data={data} content={val} actions={actions} />
		)
	}
	// 可见状态切换
	renderVisible(cfg, data, obj, val, key, index) {
		let { actions } = this.props
		return (
			<VisibleSwitch data={data} content={val} actions={actions} />
		)
	}
	// 关联子组件
	renderCompChildBind(cfg, data, obj, val, key, index) {
		let { actions } = this.props
		return (
			<CompChildBind data={data} content={val} actions={actions} />
		)
	}
	// 上传图片
	renderImage(cfg, data, obj, val, key, index) {
		return (
			<ImageUploadComp
				data={data}
				img={val}
				name={key}
				action={'updateComp'}
				style={{ width: '100%' }}
				index={index}
				type="business"
			/>
		)
	}
	// 上传视频
	renderVideo(cfg, data, obj, val, key, index) {
		return (
			<ImageUploadComp
				data={data}
				img={val}
				name={`video`}
				action={'updateComp'}
				style={{ width: '100%' }}
				type="business"
			/>
		)
	}
	//图片视频
	renderImgAndVideo(cfg, data, obj, val, key, index) {
		return (
			<ImageAndVideoComp
				data={data}
				action={'updateComp'}
				img={val}
				con={obj}
				style={{ width: '100%' }}
				index={index}
				type="business"
			/>
		)
	}
	renderMeidia(cfg, data, obj, val, key) {
		return (
			<IV
				data={data}
				action={'updateComp'}
				media={val}
				con={obj}
				style={{ width: '100%' }}
			/>
		)
	}
	// 网址
	renderUrl(cfg, data, obj, val, key, index) {
		return (
			<div>
				<TextArea
					min={cfg.min || 0} max={cfg.max || 200}
					autosize={cfg.autosize || false}
					defaultValue={val} onBlur={v => this.onChange(v.target.value, key, obj, index)}
					style={{ width: '100%' }}
				/>
				<p style={{ color: 'red', marginTop: 5 }}>{ this.urlCheck(val) }</p>
			</div>
		)
	}
	// 文本
	renderInput(cfg, data, obj, val, key, index) {
		return (
			<Input
				minLength={cfg.min || 0} maxLength={cfg.max || 100}
				defaultValue={val} onChange={v => this.onChange(v.target.value, key, obj, index)}
				style={{ width: '100%' }}
			/>
		)
	}
	// 滑块
	renderSlider(cfg, data, obj, val, key, index) {
		return (
			<Row>
				<Col span={12}>
					<Slider
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, key, obj, index)}
					/>
				</Col> 
				<Col span={3}></Col>
				<Col span={9}>
					<InputNumber
						disabled
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, key, obj, index)}
						style={{ width: '100%' }}
					/>
				</Col>
			</Row>
		)
	}
	// 颜色
	renderColor = (cfg, data, obj, val, key) => {
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
	renderCheckbox(cfg, data, obj, val, key) {
		return (
			<Checkbox
				checked={val || cfg.defaultValue || false} onChange={v => this.onChange(v.target.checked, key, obj)}
			/>
		)
	}
	renderSwitch(cfg, data, obj, val, key) {
		return (
			<Switch
				size="small"
				checked={val || false} onChange={v => this.onChange(v, key, obj)}
			/>
		)
	}
	// 备注
	renderRemarks(cfg, data, obj, val) {
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
	renderRadio(cfg, data, obj, val, key) {
		let { option } = cfg
		return (
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value, key, obj)} value={val}>
				{ option.map((_, i) => (<RadioButton key={i} value={_.value}>{_.name}</RadioButton>)) }
			</RadioGroup>
		)
	}
	// 筛选框
	renderRadioMix(cfg, data, obj, val, key) {
		let { option } = cfg
		return (
			<div className="sc-radio-group">
				{ option.map((_, i) => (
					<span
						key={i}
						className={`sc-radio-button-wrapper${val === _.value? ' s-active': ''}`}
						value={_.value}
						onClick={e => this.onChange(_.value, key, obj)}
					>{_.name}</span>
				)) }
			</div>
		)
	}
	// 绑定
	renderBind = (cfg, data, obj, val, key, index) => {
		let { db } = this.props
		let map = fieldMap[data.name]
		let { dbSource } = data.data.content
		let dbData = db.data[dbSource]
		if (dbData) {
			let field = db.field.filter(_ => _.id === dbSource)[0]
			if (field) {
				if (!map) map = {}
				field.data.forEach(_ => map[_.key] = _.name)
			}
		}
		if (!map) return null
		let opts = Object.keys(map).map((_, i) => {
			return <Option key={i} value={_}>{map[_]}</Option>
		})
		return (
			<div>
				<Select
					value={val}
					style={{ width: '100%' }}
					onChange={v => this.onChange(v, key, obj)}
				>
					<Option value={''}>无</Option>
					{ opts }
				</Select>
			</div>
		)
	}
	// 复合
	renderOptions(cfg, data, obj, val, key, index) {
		const keys      = Object.keys(val)
		const childNode = keys.map((_, i) => {
			if (_ === 'name') return null
			let v  = val[_],
				cm = conMap[_],
				fn = this[`render${cm.type}`]
			let dom = fn.bind(this, cm, data, val, v, _, index)()
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
	// 关系
	renderRel(cfg, data, obj, val, key, index) {
		let curComp = data.data.components[index]
		return (
			<RelComp data={data} field={key} curComp={curComp} content={obj} />
		)
	}
	// DB
	renderDb = (cfg, data, obj, val, key, index) => {
		let { db } = this.props.editConfig.globalData.data
		if (!db) return null
		let { field = [] } = db
		let opts = field.map((_, i) => {
			return <Option key={i} value={_.id}>{_.title}</Option>
		})
		return (
			<Select
				value={val}
				style={{ width: '100%' }}
				onChange={v => this.onChange(v, key, obj)}
			>
				<Option value={-1}>无</Option>
				{ opts }
			</Select>
		)
	}
	renObj(parent, data, content, index) {
		var { from } = this.props
		let me = this
		let ci = 0
		let childNode = Object.keys(content).map((p, i) => {
			if (!conMap[p]) return false
			let cm     = p == 'img' && content.type == 'video'? conMap.video: conMap[p],
				type   = (data.name === 'swiperImgAndVideo' || from === 'banner') && p === 'img'? 'ImgAndVideo': cm.type
			let val    = content[p]
			let auth   = data.auth.content[p]
			let render = me[`render${type}`]
			if(p == 'date' || p == 'delayOnly') {
				auth = true // 商家轮播设置时间段显示
			}
			if (!auth || !render) return false
			// 根据样式类型渲染对应组件
			let dom = render.bind(this, cm, parent, content, val, p, index)()
			ci++
			return (
				<div className="pgs-row" key={i}>
					<div className="pgsr-name">{ cm.name }</div>
					<div className="pgsr-ctrl">{ dom }</div>
					{
						(data.name !='picture'&&cm.name=='图片') || (p == 'img'&&cm.name=='视频') ? <div className="delete" onClick={()=>{this.deleteCom(index)}}><Icon type="close-circle" style={{ fontSize: 18}} /></div>:null
					}
				</div>
			)
		}) 
		if (!ci) return false
		return childNode
	}
	chiObj = (data, init) => {
		let { editConfig, from } = this.props
		let comps = data.data.components
		if (!comps) return false
		let map   = deepCopy(compNum)
		return comps.map((_, i) => {
			let _da  = _.data
			let con  = _da.content
			let name = _.name
			let cn   = compMap[name]
			let OK   = false
			let compLay = _da.componentLayout
			let compCon = compContent(name, _, this.updateComp, editConfig, from)
			let childNode
			if (con.length) {
				childNode = con.map((_, j) => {
					return (
						<Card title={`内容${j + 1}`} bordered={false} key={j}>
							{ this.renObj.bind(this, data, _, con, j)() }
						</Card>
					)
				})
				childNode.map(_ => {
					if (_) OK = true
				})
				if (!OK) return false
			} else {
				let cont = this.renObj.bind(this, data, _, con)()
				childNode = (
					cont.length
					?
					<Card title={`内容编辑`} bordered={false} key={0}>
						{ cont }
					</Card>
					:
					false
				)
				if (!childNode && !compCon) return false
			}
			++map[name]
			return (
				<Panel header={`${cn}${map[name]}`} key={init + i}>
					{ compCon }
					{ childNode }
				</Panel>
			)
		})
	}

	render() {
		var { data, actions, editConfig } = this.props,
			compName = data.name,
			content  = data.data.content,
			childNode,
			activeKey,
			chiObj
		var compCon = compContent(compName, this.props, editConfig, this.updateComp)
		if (content.length) {
			childNode = content.map((_, i) => {
				return (
					<Panel header={`内容${i + 1}  ${compName === 'swiperImgAndVideo' && !i? '(建议为图片)': ''}`} key={i + 1}>
						{ this.renObj(data, data, _, i) }
					</Panel>
				)
			})
			chiObj = this.chiObj(data, content.length + 1)
			activeKey = Array.from(new Array(content.length + (chiObj? chiObj.length: 0) + 1), (_, i) => `${i}`)
		} else {
			let con = this.renObj(data, data, content)
			childNode = (
				con.length
				? 
				<Panel header={'内容编辑'} key={0}>
					{ con }
				</Panel>
				:
				false
			)
			chiObj = this.chiObj(data, 1)
			activeKey = Array.from(new Array((chiObj? chiObj.length: 0) + 1), (_, i) => `${i}`)
		}
		return (
			<section className="pg-content-business">
				{ compCon }
				<Collapse activeKey={activeKey}>
					{ childNode }
					{ chiObj }
				</Collapse>
			</section>
		)
	}
}

EditContent.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditContent)
