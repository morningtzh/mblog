import React, { Component } from 'react';
import 'antd/dist/antd.css';

import Page from './components/framework/MainPage';
import modalControl from "./funcs/modalcontroller";
import util from "./funcs/util"

class App extends Component {

    componentDidMount() {
        util.checkLogin();
    }

    render() {
        return (
            <div>

                <Page />

            </div>
        );
    }
}

export default App;
