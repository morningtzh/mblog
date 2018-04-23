import React, {Component} from "react";

import {Layout, Affix, Row, Col} from "antd";
const {Header, Footer, Sider, Content} = Layout;

import MainContent from "./MainContent";
import MainHeader from "./MainHeader";
import MainModal from "./MainModal"


class MainPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {

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
                <Layout>
                    <Affix>
                        <Header style={{backgroundColor: "white"}}>
                            <MainHeader/>
                        </Header>
                    </Affix>

                    <Content style={{backgroundColor: "0xE0E7ED"}}>
                        <MainContent/>
                    </Content>

                    <Footer>
                        66666666
                    </Footer>
                </Layout>

                <MainModal/>
            </div>
        );
    }
}

MainPage.propTypes = {};

export default MainPage;
