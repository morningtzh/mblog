import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button, Row, Col } from 'antd';

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

        let blog = marked(modalControl.data.data.content, {
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

<Row>
    <Col span={18}>
        <p>{modalControl.data.data.title}</p>
        <p>{",".join(modalControl.data.data.hashtag)}</p>
    </Col>
    <Col span={6}>
        <p>modalControl.data.data.write_time </p>
    </Col>
</Row>

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
