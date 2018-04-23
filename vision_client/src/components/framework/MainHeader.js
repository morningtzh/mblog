import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Layout, Affix, Row, Col, Button} from "antd";

import modalControl from "../../funcs/modalcontral";


import icon from "../../../public/logo.png";


class MainHeader extends Component {
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
            <div style={{width: 1024, height:50, margin: 'auto'}}>
                <Row>
                    <Col span={3} style={{margin: 'auto'}}>
                        首页
                    </Col>
                    <Col span={3} style={{margin: 'auto'}}>
                        杂文
                    </Col>
                    <Col span={3} style={{margin: 'auto'}}>
                        碎念
                    </Col>
                    <Col span={6} style={{margin: 'auto'}}>
                        <img src={icon} style={{width:50,height:50}}/>
                    </Col>
                    <Col span={4} style={{margin: 'auto'}}>
                        嘿嘿嘿
                    </Col>
                    <Col span={5} style={{margin: 'auto'}}>
                        <Button onClick={()=>{
                            modalControl.setModal('editer', 'doc');
                        }}>open</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

MainHeader.propTypes = {};

export default MainHeader;
