import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button } from 'antd';

import modalControl from '../../funcs/modalcontroller';

import marked from 'marked'
import highlight from 'highlight'



class BlogModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: ""
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

        let blog = marked(modalControl.data.data, {
            renderer: new marked.Renderer(),
            gfm: true,
            pedantic: false,
            sanitize: false,
            tables: true,
            breaks: true,
            smartLists: true,
            smartypants: true,
            highlight: function (code) {
                return highlight.highlightAuto(code).value;
            }
        })

        console.log(blog, typeof(blog))

        this.setState({
            blog:(<div dangerouslySetInnerHTML={{__html:blog}} />)
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
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

                {this.state.blog}
                <Button onClick={() => {
                    modalControl.closeModal();
                }}
                >close
                </Button>
            </Modal>
        );
    }
}

BlogModal.propTypes = {
    visible: PropTypes.bool,
    footer: PropTypes.string,
    destroyOnClose: PropTypes.bool,
    closable: PropTypes.bool,
};

export default BlogModal;
