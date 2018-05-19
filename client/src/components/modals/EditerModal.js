import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Modal, Button, Tag, Icon, Input, Tooltip} from 'antd';
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
            textValue: "早点写完去睡觉~",
            tags: [],
            inputVisible: false,
            inputValue: ''
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
        return true;
    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }


    editerChange = (data, err) => {
        console.log(data, err)
        this.setState({textValue: data})
    };

    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = input => this.input = input;

    submit = () => {
        documents.writeDocuments("blog", this.state.textValue, this.state.tags, "test", null);
        modalControl.closeModal();
    };

    render() {

        const { tags, inputVisible, inputValue } = this.state;


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

                <div>
                    {tags.map((tag, index) => {
                        const isLongTag = tag.length > 20;
                        const tagElem = (
                            <Tag color="blue" key={tag} afterClose={() => this.handleClose(tag)}>
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </Tag>
                        );
                        return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                    })}
                    {inputVisible && (
                        <Input
                            ref={this.saveInputRef}
                            type="text"
                            size="small"
                            style={{ width: 78 }}
                            value={inputValue}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputConfirm}
                            onPressEnter={this.handleInputConfirm}
                        />
                    )}
                    {!inputVisible && (
                        <Tag
                            onClick={this.showInput}
                            style={{ background: '#fff', borderStyle: 'dashed' }}
                        >
                            <Icon type="plus" /> New Tag
                        </Tag>
                    )}
                </div>

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
