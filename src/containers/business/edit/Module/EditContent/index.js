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

import { Checkbox, Collapse, Icon, Input, InputNumber, Select } from 'antd'
const  { TextArea } = Input
const  { Panel }    = Collapse
const Option = Select.Option

import RouterJump      from 'compEdit/EditCommon/RouterJump'
import ImageUploadComp from 'compEdit/EditCommon/ImageUploadComp'

import SwiperImage       from 'compEdit/EditContent/SwiperImage'
// import StoreList         from 'compEdit/EditContent/StoreList'
import Navigation        from 'compEdit/EditContent/Navigation'
import NavigationFloat   from 'compEdit/EditContent/NavigationFloat'
import Date              from 'compEdit/EditContent/Date'
import WonderfulActivity from 'compEdit/EditContent/WonderfulActivity'
import Page              from 'compEdit/EditContent/Page'

import * as variable from 'var'

var conMap = variable.contentMap

import './index.less'

class EditContent extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	onChange(val, key, index) {
		let { data, actions, editConfig } = this.props
		let { curData } = editConfig
		let { content } = data.data
		let { parentComp } = curData
		if (index === undefined) {
			content[key] = val
		} else {
			content[index][key] = val
		}
		actions.updateComp(null, parentComp? parentComp: data)
	}

	onChangeAuth(val, key) {
		let { data, actions, editConfig } = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		data.auth.content[key] = val
		actions.updateComp(null, parentComp? parentComp: data)
	}

	cb(key) {
		// console.log(key)
	}
	deleteCom(index) { 
		let { data, actions, editConfig } = this.props;
		let { curData, curComp } = editConfig
		let { content } = data.data
		let { parentComp } = curData
		if(getAttr(content) === 'Array') {
			content = content.filter((item,i) => i!=index)
			data.data.content = content
			actions.updateComp(null, parentComp? parentComp: data)
		}   
		
	}
	/* 渲染组件开始 */
	// 文本
	renderTextarea(cfg, data, val, key, index) {
		return (
			<TextArea
				min={cfg.min || 0} max={cfg.max || 100}
				autosize={cfg.autosize || false}
				value={val} onChange={v => this.onChange(v.target.value, key, index)}
				style={{ width: '100%' }}
			/>
		)
	}
	// 数字
	renderNumber(cfg, data, val, key, index) {
		return (
			<InputNumber
				min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
				value={val} onChange={v => this.onChange(v, key, index)}
				style={{ width: '100%' }}
			/>
		)
	}
	// 标题
	renderTitle(cfg, data, val, key, index) {
		return (
			<Input
				min={cfg.min || 0} max={cfg.max || 100}
				value={val} onChange={v => this.onChange(v.target.value, key, index)}
				style={{ width: '100%' }}
			/>
		)
	} 
	// 跳转路由
	renderRouter(cfg, data, val, key, index) {
		let { actions } = this.props
		return (
			<RouterJump data={data} content={val} actions={actions} />
		)
	}
	// 上传图片
	renderImage(cfg, data, val, key, index) {
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
	// 网址
	renderUrl(cfg, data, val, key, index) {
		return (
			<Input
				min={cfg.min || 0} max={cfg.max || 100}
				defaultValue={val} onBlur={v => this.onChange(v.target.value, key, index)}
				style={{ width: '100%' }}
			/>
		)
	}
	// 开关
	renderCheckbox(cfg, data, val, key, index) {
		return (
			<Checkbox
				checked={val || cfg.defaultValue || false} onChange={v => this.onChange(v.target.checked, key)}
			/>
		)
	}

	renObj(data, content, index) {
		let ci = 0
		let childNode = Object.keys(content).map((p, i) => {
			if (!conMap[p]) return false
			let cm     = conMap[p]
			let val    = content[p]
			let auth   = data.auth.content[p]
			let render = this[`render${cm.type}`]
			if (!auth || !render) return false
			// 根据样式类型渲染对应组件
			let dom = this[`render${cm.type}`].bind(this, cm, data, val, p, index)()
			ci++
			return (
				<div className="pgs-row" key={i}>
					<div className="pgsr-name">{ cm.name }</div>
					<div className="pgsr-ctrl">{ dom }</div>
					{  
						data.name !='picture'&&cm.name=='图片'?<div className="delete" onClick={()=>{this.deleteCom(index)}}><Icon type="close-circle" style={{ fontSize: 18}} /></div>:null
					} 
				</div>
			)
		})
		if (!ci) return false
		return childNode
	}

	render() {
		let { data, actions } = this.props
		let compName = data.name
		let content  = data.data.content
		let compCon
		let childNode
		let activeKey
		if (compName === 'navigation')             compCon = (<Navigation        data={this.props}/>)
		else if (compName === 'navigationFloat')   compCon = (<NavigationFloat   data={this.props}/>)
		else if (compName === 'date')              compCon = (<Date              data={this.props}/>)
		// else if (compName === 'storeList')         compCon = (<StoreList         data={data}/>)
		else if (compName === 'wonderfulActivity') compCon = (<WonderfulActivity data={this.props}/>)
		else if (compName === 'swiperImage' && content.length > 1) compCon = (<SwiperImage data={this.props}/>)
		if (content.length && compName != 'wonderfulActivity') {
			activeKey = Array.from(new Array(content.length + 1), (_, i) => `${i}`)
			childNode = content.map((_, i) => {
				return (
					<Panel header={`内容${i + 1}`} key={i + 1}>
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
				<Panel header={'内容编辑'} key={data.name == 'video'?1:0}>
					{ con }
				</Panel>
				:
				false
			)
		}
		return (
			<section className="ry-roll-screen-config">
				{ compCon }
				<Collapse activeKey={activeKey} onChange={this.cb}>
					{
						data.name == 'swiperImage'||data.name == 'video' ? <Panel header={`内容`} key={0}>
							<div className="pgs-row" key={0}>
								<div className="pgsr-name">{data.name == 'swiperImage'?'添加图片':'添加视频'}</div>
								<div className="pgsr-ctrl">
									<ImageUploadComp
										data={data}
										img={{}}        
										name={`${data.name=='video'?'src':'first'}`}
										content={content}  
										action={'updateComp'}
										style={{ width: '100%' }}
									/>
								</div>
							</div>
						</Panel> : null
					}
					{
						!(data.name == 'swiperImage'&& content.length==1 && content[0].img.img == '') ? childNode : null
					}
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