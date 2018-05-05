import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BlogModal from './BlogModal';
import EditerModal from './EditerModal';

const MODALSELECT = {
    blog: BlogModal,
    editer: EditerModal,
};


class BaseModel extends Component {
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
        const modalType = this.props.modalType;
        const SelectedModal = MODALSELECT[modalType];

        return (
            <SelectedModal
                visible
                footer={null}
                destroyOnClose
                closable={false}
            />
        );
    }
}

BaseModel.propTypes = {};

export default BaseModel;
