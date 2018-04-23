import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Modal, Button} from "antd"

import modalControl from "../../funcs/modalcontral";


class BlogModal extends Component {
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
            <Modal
                visible={this.props.visible}
                footer={this.props.footer}
                destroyOnClose={this.props.destroyOnClose}
                closable={this.props.closable}
            >
                6666666 Im blog
                <Button onClick={()=>{
                    modalControl.closeModal();
                }}>close</Button>
            </Modal>
        );
    }
}

BlogModal.propTypes = {};

export default BlogModal;
