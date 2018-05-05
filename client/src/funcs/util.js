"use strict";

import reqwest from 'reqwest';
import { observable, action, autorun, trace } from 'mobx';

class Util {
    constructor() {
        this.getGlobalData()
    }

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
}

export default new Util()

