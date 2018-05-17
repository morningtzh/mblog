import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Row, Col, Card, Tag, Icon, Popover } from 'antd';

import { observer } from "mobx-react";
import { autorun, computed, reaction } from "mobx";

import util from "../../funcs/util"

@observer
class LoginPopover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            capture: null,
            text: "嘿！这边是登录页面~ 请注意，登陆需要开启摄像头权限。",
        };
    }

    componentWillMount() {

    }


    componentDidMount() {

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

    captureInfo = {
        interval: null,
        videoDom: null,
    };

    startCapture = () => {

        // this.setState({
        //     capture: (
        //         <div>
        //             <video id="video" ref="video" width="640" height="480" autoPlay style="display:None"/>
        //             <canvas id="canvas" ref="canvas" width="640" height="480" style="display:None"/>
        //         </div>
        //     )
        // });

        this.setState({
            text: (<p>正在登陆。。。</p>),
        });

        this.captureInfo.videoDom = this.refs.video;

        // Get access to the camera!
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
                this.captureInfo.videoDom.src = window.URL.createObjectURL(stream);
                this.captureInfo.videoDom.play();
            });
        }

        this.captureInfo.interval = setInterval(() => {

            let canvas = this.refs.canvas;
            let context = canvas.getContext('2d');
            context.drawImage(this.captureInfo.videoDom, 0, 0, 240, 320);

            let base64Img = canvas.toDataURL("image/png").replace("data:image/png;base64,", "");

            util.login(base64Img)

        }, 5000)

    };

    stopCapture = (state) => {

        console.log("stopCapture");
        clearInterval(this.captureInfo.interval);

        this.captureInfo.videoDom.pause();
        this.captureInfo.videoDom.src = null;

        this.setState({
            text: state ? (<p>登录成功</p>) : (<p>登录失败，请重新尝试</p>),
        });

        util.stopLogin()
    };

    listenLoginState = reaction(
        () => {
            console.log("listenLoginState", util.loginInfo.state)
            return util.loginInfo.state
        },
        (loginState) => {
            if(util.LOGIN_STATE.FAILD === loginState) {
                this.stopCapture(false)
            } else if(util.LOGIN_STATE.SUCCESS === loginState) {
                this.stopCapture(true)
            }
        }
    );


    render() {

        let button = null;

        if(util.LOGIN_STATE.UNLOGIN === util.loginInfo.state || util.LOGIN_STATE.FAILD === util.loginInfo.state) {
            button = (<Button onClick={this.startCapture}>
                开始登陆
            </Button>)

        } else if(util.LOGIN_STATE.LOGINING === util.loginInfo.state) {
            button = (<Button onClick={() => (this.stopCapture(false))}>
                取消登陆
            </Button>)
        } else {
            button = (<Button onClick={util.logout}>
                退出登录
            </Button>)
        }

        return (
            <div>
                <div>
                    <video id="video" ref="video" width="240" height="320" autoPlay style={{ display: "None" }}/>
                    <canvas id="canvas" ref="canvas" width="240" height="320" style={{ display: "None" }}/>
                </div>

                <p>
                    {this.state.text}
                </p>

                {button}

            </div>
        );
    }
}

LoginPopover.propTypes = {
    visible: PropTypes.bool,
    footer: PropTypes.string,
    destroyOnClose: PropTypes.bool,
    closable: PropTypes.bool,
};

export default LoginPopover;
