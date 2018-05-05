import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, Icon, Avatar, Row, Col } from  "antd"
const { Meta } = Card;
import {observer} from "mobx-react";


import util from '../../funcs/util'

import userBanner from "../../../public/userbanner.jpeg";

@observer
class UserCard extends Component {
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
            <div>
                <Card
                    hoverable
                    cover={<img alt="example" src={userBanner}/>}
                >
                    <Meta
                        title="MorningTZH"
                        description="Good morning, and in case I don't see ya'.\nGood afternoon, Good evening and Good night!"
                    />
                    <br />
                    <Row>
                        <Col span={8}>文章<br/>{util.GLOBAL_DATA.blogNum}</Col>
                        <Col span={8}>瞬间<br/>{util.GLOBAL_DATA.momentNum}</Col>
                        <Col span={8}>点赞<br/>{util.GLOBAL_DATA.likeNum}</Col>
                    </Row>
                </Card>
            </div>
        );
    }
}

UserCard.propTypes = {};

export default UserCard;
