import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Layout, Affix, Row, Col } from 'antd';


import Fall from '../cards/Fall';
import UserCard from "../cards/UserCard"

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

            <div style={{ width: 1200, margin: 'auto' }}>
                <br/>
                <Row gutter={8}>
                    <Col span={3}>
                        
                    </Col>
                    <Col span={6}>
                        <UserCard/>
                    </Col>
                    <Col span={15}>
                        <Fall name="all"/>
                    </Col>
                    <Col span={3}>
                        
                    </Col>
                </Row>

            </div>
        );
    }
}

MainContent.propTypes = {};

export default MainContent;
