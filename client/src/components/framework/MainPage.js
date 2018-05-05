import React, { Component } from 'react';

import { Layout, Affix, Row, Col } from 'antd';

import MainContent from './MainContent';
import MainHeader from './MainHeader';
import MainModal from './MainModal';

const {
    Header, Footer, Sider, Content,
} = Layout;


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
                    <Affix style={{ height: 48 }}>
                        <Header style={{ backgroundColor: 'white', height: 48 }}>
                            <MainHeader />
                        </Header>
                    </Affix>

                    <Content style={{ backgroundColor: '0xE0E7ED' }}>
                        <MainContent />
                    </Content>

                    <Footer>
                        66666666
                    </Footer>
                </Layout>

                <MainModal />
            </div>
        );
    }
}

MainPage.propTypes = {};

export default MainPage;
