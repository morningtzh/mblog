import {observable, action} from "mobx";

var store_content = observable(["6666"]);

let getContent = action((type = "all") => {

    console.log("getContent", type, store_content);
    for (let i = 0; i < 20; i++) {
        store_content.push(type + i);
    }
});

export default {store_content, getContent};







