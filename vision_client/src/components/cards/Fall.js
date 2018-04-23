import React, {Component} from "react";
import PropTypes from "prop-types";

import {observer} from "mobx-react";
import {autorun, computed} from "mobx";

import {Card, Button} from "antd";

import documents from "../../funcs/document";
import modalControl from "../../funcs/modalcontral";

@observer class BaseFall extends Component {
    constructor(props) {
        super(props);

        this.name = this.props.name;

    }

    @computed get cardsDom()  {
        console.log("lalala", documents.store_content, documents.store_content.length);

        let cardsDomJsx = [];

        let docIndex = 0;

        for (let doc of documents.store_content) {
            console.log(doc, cardsDomJsx[docIndex]);
            if (null === cardsDomJsx[docIndex] || undefined === cardsDomJsx[docIndex]) {
                cardsDomJsx.push(
                    <Card>
                        {doc}
                        <Button onClick={()=>{
                            modalControl.setModal('blog', 'doc');
                        }}>open</Button>
                    </Card>
                );
            }

            docIndex = docIndex + 1;
        }

        console.log(cardsDomJsx, documents.store_content.slice(0,10));
        return cardsDomJsx;
    };

    componentWillMount() {

    }

    componentDidMount() {
        documents.getContent("asfdasg");

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
                {this.cardsDom}

                <Button onClick={() => documents.getContent("fffff")}>
                    66666
                </Button>
            </div>
        );
    }
}

BaseFall.propTypes = {
    name: PropTypes.string
};

export default BaseFall;
