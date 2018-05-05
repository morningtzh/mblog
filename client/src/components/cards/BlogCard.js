import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, Icon, Avatar } from 'antd';

const { Meta } = Card;

class BlogCard extends Component {
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

                <p>{doc.writer} 写了新文章</p>
                <Card hoverable>
                    <p style={{fontSize: 20}}>{doc.title}</p>
                    <p>{doc.summary}</p>
                </Card>

                {
                    React.Children.map(this.props.children, (child) => {
                        return <li>{child}</li>;
                    })
                }
            </Card>
        );
    }
}

Card.propTypes = {};

export default BlogCard;
