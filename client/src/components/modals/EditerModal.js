import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Modal, Button} from 'antd';
import SimpleMDE from 'react-simplemde-editor'
import marked from 'marked'
import highlight from 'highlight'
import "simplemde/dist/simplemde.min.css"

import modalControl from '../../funcs/modalcontroller';

import documents from "../../funcs/doccontroller";



class EditerModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textValue: "早点写完去睡觉~"
        }
    }

    componentWillMount() {
        console.log("componentWillMount editor", document.getElementById('editor'))

    }

    componentDidMount() {
        console.log("editor", document.getElementById('editor'))

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

    blogContent ='';

    editerChange = (data, err) => {
        console.log(data, err)
        this.blogContent = data
    };

    submit = () => {
        documents.writeDocuments("blog", this.blogContent, ["测试","test"], "test")
    };

    render() {
        return (
            <Modal
                visible={this.props.visible}
                footer={this.props.footer}
                destroyOnClose={this.props.destroyOnClose}
                closable={this.props.closable}
            >
                <SimpleMDE
                    onChange={this.editerChange}
                    value={this.state.textValue}
                    options={{
                        autofocus: true,
                        spellChecker: false,
                        previewRender: function (plainText) {
                            return marked(plainText, {
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
                            });
                        }
                    }}
                />
                < Button onClick={this.submit}>Submit</Button>

                <Button onClick={() => {
                    modalControl.closeModal();
                }}
                >close
                </Button>
            </Modal>
        );
    }
}

EditerModal.propTypes = {
    visible: PropTypes.bool,
    footer: PropTypes.string,
    destroyOnClose: PropTypes.bool,
    closable: PropTypes.bool
};

export default EditerModal;
