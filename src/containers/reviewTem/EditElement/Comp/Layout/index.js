/**
 * @Author: Along
 * @Date:   2018-07-25

 **/

import React from 'react'
import Picture      from '../../Picture'
import Text         from '../../Text'
import Area        	from '../../Area'
import QrcodeRY     from '../../QrcodeRY' 
import QrcodeBind   from '../QrcodeBind'  
import Swiperbind from '../Common/SwiperBind'
import RYdataMap from '../Common/RYdataMap'
import './index.less'

export default class Layout extends React.Component {
	constructor(props) {
		super(props)
	}
	shouldComponentUpdate(nextProps,nextState){
		return nextProps.refresh
	}
	render() { 
		let { data,styleObj,itemList,type,realIndex } = this.props
		let components = data.data.componentLayout
		itemList? itemList = RYdataMap(itemList): null;
		let childNode = components.map((_, i) => {
			let compName = _.name, 
				layout   = _.data.layout,
				styleIdx = _.styleList.idx, 
				contentBind = _.data.content.bind,
				compCon;
			switch(compName) {
				case 'picture' : compCon = <Picture data={_} type={`Style${styleIdx + 1}`} />;break
				case 'text' : 
					if(type == 'NewStore'){
						itemList['featuredShop'] ? compCon = <Text data={_} type={`Style${styleIdx + 1}`} /> : null
					}else{
						compCon = <Text data={_} type={`Style${styleIdx + 1}`} />;
					}
					break
				case 'area' : compCon = (<Area data={_} type={`Style${styleIdx + 1}`} />);break
				case 'pictureBind' :
					let pic_data = deepCopy(_)
					if(contentBind == "qrcode"){ 
						pic_data.data.content.url = itemList['qrcode']
						compCon = <QrcodeRY data={pic_data} type={'RY_store'} />
					}else{
						let imgObj = contentBind == 'commodityPicList'&&itemList[contentBind] ? itemList[contentBind][0] : itemList[contentBind]
						pic_data.data.content.img = contentBind && imgObj ? {type:'custom',img:imgObj} : {type:'custom',img:''}
						compCon = <Picture data={pic_data} type={`Style${styleIdx + 1}`} onLine={true} />;
					}
					break 
				case 'textBind' : 
					let text_data = deepCopy(_)
					let newData = filterStr(type,contentBind,itemList,text_data);
					if(type == 'recom'&&contentBind=='recommendReason'){
						compCon = <Text data={newData} type={`Style${styleIdx + 1}`} recommendReason={true} />
					}else{
						compCon = <Text data={newData} type={`Style${styleIdx + 1}`} />
					} 
					break
				case 'swiperBind' : 
					compCon = <Swiperbind data={_} bind={contentBind} item={itemList} realIndex={realIndex} type={'recom'} />;break
				case 'qrcodeBind' : 
					compCon = <QrcodeBind data={_} item={itemList} />;break
			}
			if (!compCon) return false
			return (
				<div
					key={i}
					className="pge-layout"
					style={layout}
				>{ compCon }</div>
			)
		})
		return ( 
			<section className="pg-layout-ele" style={styleObj}>
				{ childNode }
			</section>
		)
	}
}
//过滤字段
function filterStr(type,contentBind,itemList,data){
	switch(type){   
		case 'recom' : contentBind=='name' ? contentBind = 'commodityName' : null
			data.data.content.text = contentBind&&itemList[contentBind] ? itemList[contentBind] : ''
		break   
		default : data.data.content.text = contentBind&&itemList[contentBind] ? itemList[contentBind] : ''
		break 
	}
	return data
}

