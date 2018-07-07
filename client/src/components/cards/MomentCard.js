import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, Icon, Avatar, Row, Col } from 'antd';

const { Meta } = Card;


class MomentCard extends Component {
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

        let doc = this.props.doc;

        return (
            <Card
                {...this.props.cardoption}
            >
                <p>{doc.writer} 说</p>
                <p>{doc.content}</p>

                {
                    React.Children.map(this.props.children, (child, index) => {
                        return <li key={index}>{child}</li>;
                    })
                }
            </Card>
        );
    }
}

MomentCard.propTypes = {};

export default MomentCard;
