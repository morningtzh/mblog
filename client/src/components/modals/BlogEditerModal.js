import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Modal, Button, Tag, Icon, Input, Tooltip} from 'antd';
import SimpleMDE from 'react-simplemde-editor'
import marked from 'marked'
import highlight from 'highlight'
import "simplemde/dist/simplemde.min.css"

import TagGroup from "../base/TagGroup"

import modalControl from '../../funcs/modalcontroller';

import documents from "../../funcs/doccontroller";



class EditerModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textValue: "早点写完去睡觉~",
            hashtag: [],

        }
    }

    componentWillMount() {
        console.log("componentWillMount editor", document.getElementById('editor'))

    }

    componentDidMount() {
        const doc = modalControl.data.data;
        if (!!doc && doc.id) {
            this.setState({
                hashtag: doc.hashtag,
                textValue: doc.content,
            });
            this.id=doc.id;
        }
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

    id = null;


    editerChange = (data, err) => {
        this.setState({textValue: data})
    };

    tagsChange = (hashtag) => {

        this.setState({hashtag})
    };

    saveInputRef = input => this.input = input;

    submit = () => {
        if (this.id) {
            documents.editDocuments(this.id, this.state.textValue, this.state.hashtag)
        } else {
            documents.writeDocuments("blog", this.state.textValue, this.state.hashtag, "test", null);
        }
        modalControl.closeModal();
    };

    render() {

        const { hashtag} = this.state;


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

                <TagGroup 
                    writeable={true} 
                    value={hashtag.slice()}
                    onChange={this.tagsChange}
                    newTagName="+hashtag"
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
