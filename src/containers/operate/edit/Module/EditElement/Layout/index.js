import React from 'react'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'
import { Icon, message } from 'antd'

import Picture      from 'compEdit/EditElement/Picture'
import Text         from 'compEdit/EditElement/Text'
import PictureBind  from 'compEdit/EditElement/PictureBind'
import TextBind     from 'compEdit/EditElement/TextBind'
import SwiperBind   from 'compEdit/EditElement/SwiperBind'
import Area         from 'compEdit/EditElement/Area'
import QrcodeBind   from 'compEdit/EditElement/QrcodeBind'
import MediaBind    from 'compEdit/EditElement/MediaBind'

import * as variable from 'var'
var animeMap = variable.animeCompMap,
	aStyle   = animeMap.style

const compContent = (name, data, item, autoplay, language) => {
	var props  = { data, item, autoplay, language }
	var render = {
		picture:     <Picture     {...props} />,
		text:        <Text        {...props} />,
		pictureBind: <PictureBind {...props} />,
		textBind:    <TextBind    {...props} />,
		swiperBind:  <SwiperBind  {...props} />,
		area:        <Area        {...props} />,
		qrcodeBind:  <QrcodeBind  {...props} />,
		mediaBind:   <MediaBind   {...props} />,
	}
	return render[name]
}

import './index.less'

class Layout extends React.Component {
	constructor(props) {
		super(props)
		// this.state = {}
	}
	componentWillMount() {}

	componentDidMount() {}
	// componentWillReceiveProps() {}

	render() {
		let { data = {}, layout, components, autoplay, styleObj = {}, editConfig } = this.props
		let { language } = editConfig.globalData.data

		let childNode = components.map((_, i) => {
			let compName = _.name,
				layout   = _.data.layout,
				compCon  = compContent(compName, _, data, autoplay, language)

			if (!compCon) return false

			return (
				<div
					key={i}
					className={`pge-layout`}
					style={layout}
				>{ compCon }</div>
			)
		})
		return (
			<section className={`pg-layout-ele`} style={styleObj}>
				{ childNode }
			</section>
		)
	}
}

Layout.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Layout)