import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Layout, Affix, Row, Col} from "antd";


import Fall from "../cards/Fall"

class MainContent extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        return (

            <div style={{width: 1024, margin: 'auto'}}>
                <Row>
                    <Col span={5}>
                        首页
                    </Col>
                    <Col span={14}>
                        <Fall name="all"/>
                    </Col>
                    <Col span={5}>
                        hahaha
                    </Col>
                </Row>

            </div>
        );
    }
}

MainContent.propTypes = {};

export default MainContent;
