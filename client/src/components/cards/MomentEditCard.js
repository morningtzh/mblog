import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, Icon, Avatar, Row, Col, Input, Button } from 'antd';
import modalControl from "../../funcs/modalcontroller";
import TagGroup from "../base/TagGroup";
import doccontroller from "../../funcs/doccontroller";

const { Meta } = Card;

const { TextArea } = Input;

const TYPING = Symbol("typing");
const UNTYPE = Symbol("untype");

class MomentEditCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editerStatus: UNTYPE,
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        document.getElementById(`momentedit`).addEventListener('click', this.changeEditerStatus, true);
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
        document.getElementById(`momentedit`).removeEventListener('click', this.changeEditerStatus, true);
    }

    changeEditerStatus = () => {
        document.getElementById(`momentedit`).removeEventListener('click', this.changeEditerStatus, true);
        this.setState({
            editerStatus: TYPING,
        })
    };

    text = "";
    hashtag = [];

    render() {

        let doc = this.props.doc;

        return (
            <Card
                cardoption={{
                    hoverable: true,
                }}
            >
                {
                    UNTYPE === this.state.editerStatus ?
                        (<Input
                            id={"momentedit"}
                            placeholder="分享今日所见..."
                            addonAfter={<Icon type="message"/>}
                        />) :
                        (
                            <div>
                                <TextArea
                                    rows={4}
                                    id={"momentedit"}
                                    placeholder="分享今日所见..."
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                        this.text=e.target.value;
                                    }}
                                />
                                <TagGroup
                                    writeable={true}
                                    value={this.hashtag}
                                    onChange={(hashtag) => {
                                        this.hashtag = hashtag
                                    }}
                                    newTagName="+hashtag"
                                />
                                <Button
                                    onClick={()=>{
                                        document.getElementById(`momentedit`).addEventListener('click', this.changeEditerStatus, true);
                                        this.setState({
                                            editerStatus: UNTYPE,
                                        })
                                        doccontroller.writeDocuments("moment", this.text, this.hashtag)
                                    }}
                                >
                                    <Icon type="rocket"/>
                                </Button>
                            </div>
                        )
                }

            </Card>
        );
    }
}

MomentEditCard.propTypes = {};

export default MomentEditCard;
