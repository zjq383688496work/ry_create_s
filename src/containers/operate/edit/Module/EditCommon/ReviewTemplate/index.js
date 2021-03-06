import React from 'react';
import SkyLight from 'react-skylight';
import getClientScale from '../getClientScale'
import RouterRY from 'reviewTem/router'
import './index.less' 
const commonCssP = {
	dialogStyles: {
		height: '768px',
		width: '432px',
		left: 0,
		right: 0,
		top: '50%',
		margin: '-384px auto 0',
		background: '#F9F9F9',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,0.20)',
		padding:0  
	}, 
	titleStyle: {
		height: '45px',
		lineHeight: '45px',
		paddingLeft: '24px',
		display:'none'
	},
	closeButtonStyle: {
		cursor: 'pointer',
		position: 'absolute',
		fontSize: '40px',
		color: '#92969C',
		right: '20px',
		top: 0,
		display:'none'
	}  
}
const commonCssL = {
	dialogStyles: {
		height: '540px',
		width: '960px',
		left: 0,
		right: 0,
		top: '50%',
		margin: '-384px auto 0',
		background: '#F9F9F9',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,0.20)',
		padding:0  
	}, 
	titleStyle: {
		height: '45px',
		lineHeight: '45px',
		paddingLeft: '24px',
		display:'none'
	},
	closeButtonStyle: {
		cursor: 'pointer',
		position: 'absolute',
		fontSize: '40px',
		color: '#92969C',
		right: '20px',
		top: 0,
		display:'none'
	}  
} 

export default class ReviewTemplate extends React.Component {
	show() {
		this.setState({ init: true }, () => this.reviewModal.show())
	}
	state = {
		init: false
	} 
	componentDidMount() {}

	onOverlayClicked = () => {
		this.setState({init: false})
	}
	render() {
		var scale = tempCfg.composeType === 'LANDSCAPE'? 1: getClientScale(960, 80),
			style = tempCfg.composeType === 'LANDSCAPE'? { height: ~~(540 * scale), width: ~~(960 * scale), margin:`-${~~(540 * scale) / 2}px auto 0`}: { height: ~~(960 * scale), width: ~~(540 * scale), margin:`-${~~(960 * scale) / 2}px auto 0`},
			commonCss = tempCfg.composeType === 'LANDSCAPE'? commonCssL: commonCssP
		return (
			<div className="ReviewTemplateShadow">
				<SkyLight
					dialogStyles={{...commonCss.dialogStyles,...style}}
					titleStyle={commonCss.titleStyle}
					closeButtonStyle={commonCss.closeButtonStyle}
					hideOnOverlayClicked
					onOverlayClicked={this.onOverlayClicked}
					ref={com => { this.reviewModal = com }}
					title={''}
				>  
				<div className={`${tempCfg.composeType=='LANDSCAPE'?'reviewTemplate-l':'reviewTemplate-p'}`} id="reviewTemplate" style={{transform:`scale(${scale})`}}> 
					{
						this.state.init
						?
						<RouterRY editConfig={this.props.editConfig} actions={this.props.actions}></RouterRY>
						: null
					}
				</div>     
				</SkyLight>  
			</div> 
		)  
	}
} 
