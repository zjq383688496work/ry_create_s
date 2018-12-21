/**
 * @Author: yawen
 * @Date:   2018-11-29

 */
import React from 'react'
import './index.less'

import  SwiperSame  from '../SwiperSame'
  
 

class ListByActivity2 extends React.Component {
	constructor(props) {
		super(props)

	} 
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}
 

	render() {
		let { data } = this.props;
		if (!data.editConfig) data = data.data
		if (!data.editConfig) return
		return (  
			<SwiperSame data={data} /> 
		)
	}
} 

export default ListByActivity2