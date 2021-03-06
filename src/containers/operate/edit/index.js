'use strict';

import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import EditHeader          from 'compEdit/EditHeader'
import EditPage            from 'compEdit/EditPage'
import EditPageManage      from 'compEdit/EditPageManage'
import EditCompLayout      from 'compEdit/EditCompLayout'
import EditChildCompLayout from 'compEdit/EditChildCompLayout'
import EditContent         from 'compEdit/EditContent'
import EditElement         from 'compEdit/EditElement'
import EditStyle           from 'compEdit/EditStyle'
import EditAnimation       from 'compEdit/EditAnimation'
import EditTheme           from 'compEdit/EditTheme'
import EditStatus          from 'compEdit/EditStatus'

import * as actions from 'actions'

import 'rc-color-picker/assets/index.css'

import './index.less'

import { Tabs } from 'antd'
const TabPane = Tabs.TabPane

const curMap = {
	parentComp:   '父组件',
	router:       '路由',
	pageGroupIdx: '页面分组索引',
	pageIdx:      '页面索引',
	compIdx:      '组件索引',
	cusCompIdx:   '子组件索引',
	contentType:  '右侧面板类型'
}
const cTypeMap = {
	page:  '页面',
	comp:  '组件',
	theme: '主题'
}

import * as variable from 'var'
const { statusAuth } = variable

class EditComponent extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {}

	componentDidMount() {}

	selectPage = (e) => {
		let { actions, editConfig } = this.props
		let { curData } = editConfig
		if (!curData.router) return false
		actions.selectPage(curData.router)
	}

	isVoice = () => {
		let { curComp, curData } = this.props.editConfig,
			{ parentComp } = curData
		if (curComp.name === 'voice') return true
		if (parentComp && parentComp.name === 'voice') return true
		return false
	}

	render() { 
		let { editConfig, location } = this.props,
			{ curComp, curData, curPage, globalData, pageList } = editConfig,
			{ banner, theme } = globalData,
			{ db }  = globalData.data,
			colors  = theme.list[theme.idx].colors,
			type    = curData.contentType,
			isVoice = this.isVoice(),
			editTab
		window.curThemeColor = colors
		if (type === 'page') {
			editTab = <EditPage data={curPage} />
		} else if(type === 'comp') {
			editTab = (
				<Tabs defaultActiveKey="1" type="card">
					<TabPane tab="内容" key="1"><EditContent   data={curComp} db={db} from={null}/></TabPane>
					<TabPane tab="展示" key="2"><EditStyle     data={curComp} db={db} from={null}/></TabPane>
					<TabPane tab="动画" key="3"><EditAnimation data={curComp} db={db} from={null}/></TabPane>
					{
						statusAuth[curComp.name]
						?
						<TabPane tab="状态" key="4"><EditStatus data={curComp} from={null}/></TabPane>
						: null
					}
				</Tabs>
			)
		} else if (type === 'banner') {
			editTab = (
				<Tabs defaultActiveKey="1" type="card">
					<TabPane tab="内容" key="1"><EditContent data={banner} from="banner"/></TabPane>
					<TabPane tab="展示" key="2"><EditStyle   data={banner} from="banner"/></TabPane>
				</Tabs>
			)
		} else if (type === 'theme') {
			editTab = <EditTheme data={theme} />
		}
		return (
			<div className="pg-edit-box">
				<EditHeader location={location}/>
				<div className="pg-body e-flex-box">
					<div className="pg-left scrollbar">
						<EditPageManage data={pageList} />
					</div>
					<div className="pg-left pg-left-fc scrollbar">
						{
							curData.router && !isVoice &&
							<EditCompLayout data={curPage} />
						}
						{
							curData.router &&
							<EditChildCompLayout data={curData.parentComp || curComp} />
						}
					</div>
					{
						/*curData.router && !isVoice &&
						<div className="pg-left scrollbar">
							<EditCompLayout data={curPage} />
						</div>*/
					}
					{
						/*curData.router &&
						<div className="pg-left scrollbar">
							<EditChildCompLayout data={curData.parentComp || curComp} />
						</div>*/
					}
					<div
						className="pg-center e-flex-box scrollbar"
						onClick={this.selectPage}
						onContextMenu={this.selectPage}
					>
						<EditElement data={editConfig.curPage} location={location}></EditElement>
					</div>
					<div className="pg-right scrollbar">
						{ editTab }
					</div>

					{
						/*ENV === 'dev' &&
						<div className="pg-float e-flex-box scrollbar">
							{ Object.keys(curData).map((_, i) => {
								var im = curData[_]
								return (
									<p key={i}>
										<span>{curMap[_]}<br/>{_}</span>
										{typeof im === 'object'? im? '{...}': 'null': _ === 'contentType'? cTypeMap[im]: im}
									</p>
								)
							}) }
						</div>*/
					}
				</div>
			</div>
		);
	}
}

EditComponent.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditComponent)
