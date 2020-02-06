import React from 'react'

import InputFile from '../InputFile'

import { Row, Col, Collapse, InputNumber, Slider, Icon, message } from 'antd'
import './index.less'
const Panel  = Collapse.Panel


let musicMap = { type: 'Slider', min: 0, max: 100, step: 1 }
export default class BackMusic extends React.Component {
	state = {
		loading: false,
	}
	componentDidMount(){
		let { data } = this.props,
			dom = document.getElementById('RYAudio')
		dom? dom.volume = data.data.music['volume'] / 100: null
	}
	onChange(val, key) {
		let { data } = this.props,
			dom = key == 'volume' ? document.getElementById('RYAudio') : false
		if(data.data.music){
			data.data.music[key] = val
		}else{
			data.data['music'] = {url:'',volume:50}
			data.data.music[key] = val
		}
		dom ? dom.volume = data.data.music['volume']/100 : null
		this.update()
	} 
	removeMusic = () => {
		let { data } = this.props
		data.data.music['url'] = ''
		this.update()
	}
	update = () => {
		let { actions, action, data } = this.props
		actions[action](data)
		this.setState({ idx: 0 })
	}
	// 滑块
	renderSlider(cfg, val, key) {
		return (
			<Row>
				<Col span={12}>
					<Slider
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, key)}
					/>
				</Col>
				<Col span={3}></Col>
				<Col span={9}>
					<InputNumber
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, key)}
						style={{ width: '100%' }}
					/>
				</Col>
			</Row>
		)
	}
	cb = key => {
		console.log(key)
	}
	customRequest = (state, file) => {
		if (!state) return message.info(file)
		var that = this
		var filedata = new FormData()
		this.setState({ loading: true })
		filedata.append('file', file, file.name)
		Ajax.postJSONAUDIO('/easy-smart-web/audioUpload/uploadBackgroundMusic', filedata).then(res => {
			if(res.success){
				message.info('上传成功!')
				that.setState({ loading: false })
				that.onChange(res.result.data,'url')
			} else {
				that.setState({ loading: false })
				message.error(res.meta.msg)
			}
		})
	}
	render() {
		let { data, action, actions } = this.props,
			{ loading } = this.state,
			activeKey = Array.from(new Array(1), (_, i) => `${i}`),
			music = data.data.music || { url:'',volume:50 },
			btnNode

		var params = {
			accept: '.mp3',
			loading,
			maxFileSize: 20 * 1000 * 1000,
			handleCheck: this.customRequest
		}
		if (music.url) {
				btnNode = (
					<div className="add_img add_video">
						<div className="shadow">
							<div className="add_text_change">
								<InputFile {...params}>
									<div className="if-box">
										<Icon type={loading? 'loading': 'reload'}/>
									</div>
								</InputFile>
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
						<div className="tite">支持mp3格式音乐文件</div>
					</div> 
				)
			}
		return (
			<Collapse defaultActiveKey={activeKey} onChange={this.cb}>
				<Panel header={`背景音乐`} key={0}>
					<div className="pgs-row" key={0}>
						<div className="pgsr-name">背景音乐</div>
						<div className="pgsr-ctrl">
							<div className="pg-img-upload" id="BackMusic">
								<Row type="flex" align="middle" style={{ width: '100%' }}>
									<Col span={9}>
										{ btnNode }
									</Col>
								</Row>
							</div>
						</div>
						<div className="pgsr-auth"></div>
					</div>
					{
						music.url ? <div className="pgs-row" key={1}>
							<div className="pgsr-name">音量调节</div>
							<div className="pgsr-ctrl">
								{this.renderSlider.bind(this,musicMap,music.volume,'volume')()}
							</div>
							<div className="pgsr-auth"></div>
						</div> : null
					} 
					{
						music.url ? <div className="pgs-row" key={2}>
							<div className="pgsr-name">试听</div>
							<div className="pgsr-ctrl audioDom">
								<audio src={music.url} controls id="RYAudio"></audio>
							</div>
							<div className="pgsr-auth"></div>
						</div> : null
					}
				</Panel>
			</Collapse>
		)
	}
}
