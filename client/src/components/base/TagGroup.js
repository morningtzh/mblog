import React, { Component } from "react";
import PropTypes from 'prop-types';

import { Tag, Input, Tooltip, Icon } from "antd";

class TagGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            inputVisible: false,
            inputValue: "",
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        if ("value" in this.props && !!this.props.value) {
            const tags = this.props.value;
            this.setState({ tags });
        }
    }

    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if ("value" in nextProps && !!nextProps.value) {
            const tags = nextProps.value;
            this.setState({ tags });
        }
    }

    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
        this.triggerChange(tags);
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;

        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: "",
        });

        this.triggerChange(tags);
    };

    saveInputRef = (input) => {
        this.input = input;
    };


    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(changedValue);
        }
    };

    render() {
        const { tags, inputVisible, inputValue } = this.state;
        const { writeable } = this.props;

        return (

            <div>
                {tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag key={tag} closable={writeable} afterClose={() => this.handleClose(tag)}>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                })}
                {writeable && inputVisible && (
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
                {writeable && !inputVisible && (
                    <Tag
                        onClick={this.showInput}
                        style={{ background: "#fff", borderStyle: "dashed" }}
                    >
                        <Icon type="plus" /> {this.props.newTagName ? this.props.newTagName : "new tag"}
                    </Tag>
                )}
            </div>
        );
    }
}

TagGroup.propTypes = {
    value: PropTypes.array,
};

export default TagGroup;
