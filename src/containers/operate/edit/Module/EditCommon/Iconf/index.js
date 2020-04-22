import React from 'react'

class Iconf extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		return (
			<i className={`iconfont icon-${this.props.type}`}></i>
		)
	}
}

export default Iconf