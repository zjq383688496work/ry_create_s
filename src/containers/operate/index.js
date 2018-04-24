/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-18T19:00:50+08:00
*/

'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import * as actions from 'actions';
import './index.less';

class OperateComponent extends React.Component {
    constructor(props) {
        super(props)
        debugger
    }

    componentWillMount() {
    }

    componentDidMount() {
        debugger
        hashHistory.push('/operate/edit/1080*1920/home')
    }

    render() {
        debugger
        return (
            <div className="pg-template">
                { this.props.children }
            </div>
        );
    }
}

OperateComponent.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OperateComponent)
