"use strict";

import reqwest from 'reqwest';
import { observable, action, autorun, trace, computed } from 'mobx';


class Util {
    constructor() {
        this.getGlobalData()
    }

    LOGIN_STATE = {
        UNLOGIN: Symbol("UNLOGIN"),
        LOGINING: Symbol("LOGINING"),
        FAILD: Symbol("FAILD"),
        SUCCESS: Symbol("SUCCESS"),
    };

    GLOBAL_DATA = observable({
        blogNum: 0,
        momentNum: 0,
        likeNum: 0,
        keywordList: [],
        blogCategoryList: [],
        hashtagList: [],
    });


    getGlobalData = () => {
        console.log("getGlobalData");
        reqwest({
            url: '/globaldata',
            method: 'get',
            type: 'json',
        })
            .then((data) => {
                console.log(`getGlobalData ${data}`);
                console.log(`getGlobalData ${data.global_data}`);

                action(() => {
                    this.GLOBAL_DATA.blogNum = data.global_data.blogNum;
                    this.GLOBAL_DATA.momentNum = data.global_data.momentNum;
                    this.GLOBAL_DATA.likeNum = data.global_data.likeNum;
                    this.GLOBAL_DATA.keywordList = data.global_data.keywordList;
                    this.GLOBAL_DATA.blogCategoryList = data.global_data.blogCategoryList;
                    this.GLOBAL_DATA.hashtagList = data.global_data.hashtagList;
                })();
            })
            .fail((err, msg) => {
                console.log(`getGlobalData failed ${err}, ${msg}`);
            })
    };

    loginInfo = observable({
        state: this.LOGIN_STATE.UNLOGIN,
        times: 0,
    });

    checkLogin = () => {
        if("True" === this.getCookie("Login")) {
            action(() => {
                this.loginInfo.state = this.LOGIN_STATE.SUCCESS
            })();
        }
    };

    login = (base64Img) => {

        if(this.LOGIN_STATE === this.loginInfo.state) {
            return
        }

        action(() => {
            this.loginInfo.state = this.LOGIN_STATE.LOGINING;
        })();

        console.log("login");
        reqwest({
            url: '/user',
            method: 'POST',
            type: 'json',
            data: {
                logtype: "login",
                base64Img: base64Img
            }
        })
            .then((data) => {
                console.log(`login ${data}`);
                console.log(`login ${data.errno}`);

                action(() => {
                    if(data.errno === 0) {
                        this.loginInfo.state = this.LOGIN_STATE.SUCCESS;
                    } else {
                        if(this.loginInfo.times > 10 && this.loginInfo.state === this.LOGIN_STATE.LOGINING) {
                            this.loginInfo.state = this.LOGIN_STATE.FAILD;
                            this.loginInfo.times = 0;
                        }
                        else {
                            this.loginInfo.times++
                        }
                    }
                })();

                console.log("login", this.loginInfo.state, this.loginInfo.times)
            })
            .fail((err, msg) => {
                console.log(`login failed ${err}, ${msg}`);
            })
    };

    stopLogin = () => {
        action(() => {
            this.loginInfo.state = this.LOGIN_STATE.UNLOGIN;
        })();
        console.log("logout", this.loginInfo.state, this.loginInfo.times)
    };

    logout = () => {

        action(() => {
            this.loginInfo.state = this.LOGIN_STATE.UNLOGIN;
        })();
        console.log("logout", this.loginInfo.state, this.loginInfo.times)

        reqwest({
            url: '/user',
            method: 'POST',
            type: 'json',
            data: {
                logtype: "logout"
            }
        })
            .then((data) => {
                console.log(`logout ${data}`);
                console.log(`logout ${data.errno}`);


            })
            .fail((err, msg) => {
                console.log(`logout failed ${err}, ${msg}`);
            })

    };

    @computed get ifLogin() {

        return (this.loginInfo.state === this.LOGIN_STATE.SUCCESS);
    }

    setCookie = (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    };

    getCookie = (cname) => {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            const c = ca[i].trim();
            if(0 === c.indexOf(name)) return c.substring(name.length, c.length);
        }
        return "";
    }
}

export default new Util()

