import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button, Row, Col, Card, Tag, Icon } from 'antd';

import DocBaseCard from "../cards/DocBaseCard";

import modalControl from '../../funcs/modalcontroller';

import TagGroup from "../base/TagGroup"



class MomentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: '',
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {

        let doc = modalControl.data.data;

        return (
            <Modal
                visible={this.props.visible}
                footer={this.props.footer}
                destroyOnClose={this.props.destroyOnClose}
                closable={this.props.closable}
            >

                <p>{doc.writer} 说</p>
                <p>{doc.content}</p>
                <TagGroup 
                        value={doc.hashtag.slice()} 
                        />
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

                <Button onClick={() => {
                    modalControl.closeModal();
                }}
                >close
                </Button>
            </Modal>
        );
    }
}

MomentModal.propTypes = {
    visible: PropTypes.bool,
    footer: PropTypes.string,
    destroyOnClose: PropTypes.bool,
    closable: PropTypes.bool,
};

export default MomentModal;
