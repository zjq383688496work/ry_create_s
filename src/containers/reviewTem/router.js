import React        from 'react'
import EditElementCommon from 'reviewTem/page/pageCommon'
import Voice            from './EditElement/Voice'
import backHome from 'reviewTem/backHome.js'
window.backHomeTime = 30

let defaultData = {
	categories:[
		{
			id:      '5a532b82130b38000b1884a1',
			name:    '餐 饮',
			picture: 'http://rongyi.b0.rongyi.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
			sort:    1
		},
		{
			id:      '5a532b82130b38000b1884a2',
			name:    '服 饰',
			picture: 'http://rongyi.b0.rongyi.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
			sort:    1
		},
		{
			id:      '5a532b82130b38000b1884a3',
			name:    '亲 子',
			picture: 'http://rongyi.b0.rongyi.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
			sort:    1
		},
		{
			id:      '5a532b82130b38000b1884a4',
			name:    '娱 乐',
			picture: 'http://rongyi.b0.rongyi.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
			sort:    1
		},
		{
			id:      '5a532b82130b38000b1884a5',
			name:    '其他',
			picture: 'http://rongyi.b0.rongyi.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
			sort:    1
		}
	],
	floors:[
		{
			id:      '5a532b82130b38000b1884a1',
			name:    'B1',
			picture: 'http://rongyi.b0.rongyi.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
			sort:    1
		},
		{
			id:      '5a532b82130b38000b1884a2',
			name:    'L1',
			picture: 'http://rongyi.b0.rongyi.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
			sort:    1
		},
		{
			id:      '5a532b82130b38000b1884a3',
			name:    'L2',
			picture: 'http://rongyi.b0.rongyi.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
			sort:    1
		},
		{
			id:      '5a532b82130b38000b1884a4',
			name:    'L3',
			picture: 'http://rongyi.b0.rongyi.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
			sort:    1
		},
		{ 
			id:      '5a532b82130b38000b1884a5',
			name:    'L4',
			picture: 'http://rongyi.b0.rongyi.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
			sort:    1
		}
	],
	builds: new Array(7).fill().map((_, i) => {
		return {
			id:   i + 1,
			name: ['A', 'B', 'C', 'D', 'E', 'F', 'G'][i]
		}
	})
}
export default class RouterRY extends React.Component {
	constructor(props) {
		super(props)

		let { homepage } = props.editConfig.globalData.data
		this.state = {
			homePage: homepage
		}
	}
	componentWillMount() {}
	componentDidMount() {
		let { music } = this.props.editConfig.globalData.data
		if (music && music.url) {
			let dom = document.getElementById('RYAudioShow')
			dom.volume = music.volume / 100
		}
	}
	componentWillReceiveProps(props) {
		let {pageContent,globalData} = props.editConfig,
		homePage = globalData.feature.reviewRouter
		console.log('homePage: ', homePage)
		this.setState({ homePage })
	}
	render() {
		let { pageContent, globalData, pageList } = this.props.editConfig,
			{ homePage } = this.state,
			{ music } = globalData.data
		if (!homePage) return null
		let dom = Object.keys(pageContent).map(_ => {
			return pageContent[_].router == homePage
			?
			<EditElementCommon
				pageContent={pageContent[_]}
				globalData={globalData}
				actions={this.props.actions}
				categories={defaultData.categories}
				floors={defaultData.floors}
				builds={defaultData.builds}
				pageList={pageList.group[0].pages}
				key={_}
			></EditElementCommon>
			: null
		})
		return (
			<div>
				{ dom }
				<Voice {...this.props} />
				{
					music && music.url
					?
					<audio src={music.url} autoPlay loop id="RYAudioShow"></audio>
					: null
				}
			</div>
		)
	}
}
