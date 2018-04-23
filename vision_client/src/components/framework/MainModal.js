import React, {Component} from "react";
import PropTypes from "prop-types";

import {observer} from "mobx-react";
import {computed, trace} from "mobx";

import BaseModal from "../modals/BaseModel";

import modalControl from "../../funcs/modalcontral";

@observer class MainModal extends Component {
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

    @computed get modal() {

        console.log("MainModal changed", modalControl.data.visible);

        if (modalControl.data.visible) {
            return (
                <BaseModal
                    modalType={modalControl.data.type}
                    modalData={modalControl.data.data}
                />
            );
        }

        return null;
    }

    render() {


        return (
            <div>
                {this.modal}
            </div>
        );
    }
}

MainModal.propTypes = {};

export default MainModal;
