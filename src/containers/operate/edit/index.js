/*
 * @Author: liaohui
 * @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-23T14:40:00+08:00
*/

'use strict';

import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import EditHeader     from 'compEdit/EditHeader'
import EditPage       from 'compEdit/EditPage'
import EditPageManage from 'compEdit/EditPageManage'
import EditCompLayout from 'compEdit/EditCompLayout'
import EditContent    from 'compEdit/EditContent'
import EditElement    from 'compEdit/EditElement'
import EditStyle      from 'compEdit/EditStyle'
import EditAnimation  from 'compEdit/EditAnimation'
import EditTheme      from 'compEdit/EditTheme'
import EditStatus     from 'compEdit/EditStatus'

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

	render() { 
		let { editConfig, location } = this.props,
			{ curComp, curData, globalData } = editConfig,
			{ banner, theme } = globalData,
			colors = theme.list[theme.idx].colors,
			type   = curData.contentType,
			editTab
		window.curThemeColor = colors
		if (type === 'page') {
			editTab = <EditPage data={editConfig.curPage} />
		} else if(type === 'comp') {
			editTab = (
				<Tabs defaultActiveKey="1" type="card">
					<TabPane tab="内容" key="1"><EditContent   data={curComp} from={null}/></TabPane>
					<TabPane tab="展示" key="2"><EditStyle     data={curComp} from={null}/></TabPane>
					<TabPane tab="动画" key="3"><EditAnimation data={curComp} from={null}/></TabPane>
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
			editTab = <EditTheme data={editConfig.globalData.theme} />
		}
		return (
			<div className="pg-edit-box">
				<EditHeader location={location}/>
				<div className="pg-body e-flex-box">
					<div className="pg-left scrollbar">
						<EditPageManage data={editConfig.pageList} />
					</div>
					{
						curData.router &&
						<div className="pg-left scrollbar">
							<EditCompLayout data={editConfig.curPage} />
						</div>
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
