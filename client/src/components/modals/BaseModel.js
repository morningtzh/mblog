import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BlogModal from './BlogModal';
import MomentModal from './MomentModal'
import BlogEditerModal from './BlogEditerModal';

const MODALSELECT = {
    blog: BlogModal,
    moment: MomentModal,
    editer: BlogEditerModal,
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
        return true;
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
