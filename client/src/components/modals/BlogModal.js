import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button, Row, Col, Card, Tag } from 'antd';

import { observer } from "mobx-react";
import { autorun, computed, reaction } from "mobx";

import modalControl from '../../funcs/modalcontroller';

import marked from 'marked';
import highlight from 'highlight';

import TagGroup from "../base/TagGroup"
import util from "../../funcs/util";

@observer
class BlogModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: '',
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        const blog = marked(modalControl.data.data.content, {
            renderer: new marked.Renderer(),
            gfm: true,
            pedantic: false,
            sanitize: false,
            tables: true,
            breaks: true,
            smartLists: true,
            smartypants: true,
            highlight(code) {
                return highlight.highlightAuto(code).value;
            },
        });

        console.log(blog, typeof (blog));

        this.setState({
            blog: (<div dangerouslySetInnerHTML={{ __html: blog }}/>),
        });
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

        const doc = modalControl.data.data;

        return (
            <Modal
                visible={this.props.visible}
                footer={this.props.footer}
                destroyOnClose={this.props.destroyOnClose}
                closable={this.props.closable}
            >

                <Row>
                    <Col span={18}>
                        <p style={{ fontSize: 35 }}>{doc.title}</p>
                    </Col>
                    <Col span={6}>
                        <p>{doc.write_time} </p>
                    </Col>
                </Row>

                <Card
                    hoverable
                >
                    {this.state.blog}
                </Card>

                <TagGroup
                    value={doc.hashtag.slice()}
                />

                {util.ifLogin && (<Button onClick={() => {
                    modalControl.setModal('editer', doc);
                }}
                >修改
                </Button>)}

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
