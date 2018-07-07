import React, {Component} from "react";
import PropTypes from "prop-types";

import {observer} from "mobx-react";
import {autorun, computed} from "mobx";

import {Card, Button} from "antd";

import DocBaseCard from "../cards/DocBaseCard"
import MomentEditCard from "../cards/MomentEditCard"

import documents from "../../funcs/doccontroller";
import util from "../../funcs/util"

@observer class BaseFall extends Component {
    constructor(props) {
        super(props);

        this.name = this.props.name;

    }

    @computed get cardsDom()  {
        //console.log("lalala", documents.store_content, documents.store_content.length);

        let cardsDomJsx = [];

        let docIndex = 0

        /* 加载 document 为 jsx */
        for (let doc of documents.newDocuments) {

            /* 需要过滤已解析的 jsx */
            if (null === cardsDomJsx[docIndex] || undefined === cardsDomJsx[docIndex]) {

                /* 通过 DocBaseCard 去生成不同类别的卡片 */
                cardsDomJsx.push(
                    <div key={doc.id}>
                        <DocBaseCard doc={doc} />
                    </div>
                );
            }

            docIndex = docIndex + 1;

        }

        //console.log(cardsDomJsx, documents.store_content.slice(0,10));
        return cardsDomJsx;
    };

    componentWillMount() {

    }

    componentDidMount() {


        documents.getDocuments("all");
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

    render() {
        return (
            <div>
                {util.ifLogin && <MomentEditCard/>}

                {this.cardsDom}

                <Button onClick={() => documents.getDocuments("all")}>
                    加载更多
                </Button>
            </div>
        );
    }
}

BaseFall.propTypes = {
    name: PropTypes.string
};

export default BaseFall;
