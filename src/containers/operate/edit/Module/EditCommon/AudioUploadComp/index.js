import React from 'react'
import InputFile from '../InputFile'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'
import { Row, Col, Icon, message } from 'antd'
import './index.less'

let musicMap = { type: 'Slider', min: 0, max: 100, step: 1 }

class AudioUploadComp extends React.Component {
	state = {
		loading: false
	}
	componentDidMount() {
		this.resetVolume(this.props)
	}
	componentWillReceiveProps(props) {
		this.resetVolume(props)
	}
	resetVolume = ({ data }) => {
		let { dom }  = this.refs,
			{ content } = data.data
		dom? dom.volume = content.volume / 100: null
	}
	onChange(val) {
		let { data, action, actions, editConfig } = this.props,
			{ dom }  = this.refs,
			{ content } = data.data,
			{ parentComp } = editConfig.curData
		content.audio = val
		dom? dom.volume = content.volume / 100: null
		actions[action](null, parentComp? parentComp: data)
	} 
	removeMusic = () => {
		let { data, action, actions, editConfig } = this.props,
			{ parentComp } = editConfig.curData
		data.data.content.audio = ''
		actions[action](null, parentComp? parentComp: data)
	}
	customRequest = (state, file) => {
		if (!state) return message.info(file)
		var filedata = new FormData()
		this.setState({ loading: true })
		filedata.append('file', file, file.name)
		Ajax.postJSONAUDIO('/easy-smart-web/audioUpload/uploadBackgroundMusic', filedata).then(res => {
			if(res.success) {
				message.info('上传成功!')
				this.onChange(res.result.data)
			} else {
				message.error(res.meta.msg)
			}
			this.setState({ loading: false })
		})
	}
	render() {
		let { data, action, actions } = this.props,
			{ audio, volume, loop } = data.data.content,
			{ loading } = this.state,
			activeKey = Array.from(new Array(1), (_, i) => `${i}`),
			btnNode

		var params = {
			accept: '.mp3',
			loading,
			maxFileSize: 20 * 1000 * 1000,
			handleCheck: this.customRequest
		}

		if (audio) {
			btnNode = (
				<div className="add_img add_video">
					<div className="shadow">
						<div className="add_text_change">
							<InputFile {...params}>
								<div className="if-box">
									<Icon type={loading? 'loading': 'reload'}/>
								</div>
							</InputFile>
							<div className="tite">支持mp3格式</div>
						</div>
						<div className="add_text_remove" onClick={this.removeMusic}><Icon type="close" /></div>
					</div>
				</div>
			)
		} else {
			btnNode = (
				<div className="add_img">
					 <InputFile {...params}>
						<div className="if-box">
							<Icon type={loading? 'loading': 'plus'}/>
						</div>
					</InputFile>
					<div className="tite">支持mp3格式</div>
				</div> 
			)
		}
		return (
			<div className="audio-upload">
				<div className="pgs-row" key={0}>
					<div className="pgsr-ctrl">
						<div className="pg-img-upload">
							<Row type="flex" align="middle" style={{ width: '100%' }}>
								<Col span={9}>
									{ btnNode }
								</Col>
							</Row>
						</div>
					</div>
				</div>
				{
					audio
					?
					<div className="pgs-row" key={2}>
						<div className="pgsr-ctrl audioDom">
							<audio src={audio} controls ref="dom" loop={loop}></audio>
						</div>
					</div>
					: null
				}
			</div>
		)
	}
}

AudioUploadComp.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AudioUploadComp)
