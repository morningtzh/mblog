import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, Icon, Avatar, Button, Row, Col } from 'antd';

import modalControl from '../../funcs/modalcontroller';

import BlogCard from './BlogCard';
import MomentCard from './MomentCard';

const { Meta } = Card;

const DOCCARDSELECT = {
    blog: BlogCard,
    moment: MomentCard,
};

class DocBaseCard extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {

        /* 监听相应卡片的点击事件，弹出 modal */
        document.getElementById(this.props.doc.id).addEventListener('click', (event) => {
            modalControl.setModal('blog', this.props.doc);
        }, true);
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
        /* 需要解除事件监听 */
    }

    render() {
        console.log("basecard", this.props.doc)
        const SelectedCard = DOCCARDSELECT[this.props.doc.doc_type];

        let doc = this.props.doc;

        return (
            <div id={doc.id}>
                <SelectedCard
                    cardoption={{
                        hoverable: true,
                    }}
                    doc={doc}
                >
                    <Row>
                        <Col span={5}>
                            {doc.post_before}
                        </Col>
                        <Col span={3}>
                            <Icon type="message" /> {doc.comments.length}
                        </Col>
                        <Col span={3}>
                            <Icon type="heart-o" /> {doc.like_num}
                        </Col>
                        <Col span={13}>

                        </Col>
                    </Row>
                </SelectedCard>
            </div>
        );
    }
}

Card.propTypes = {};

export default DocBaseCard;
