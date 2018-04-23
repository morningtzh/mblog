import {observable, action, autorun, trace} from "mobx";

let data = observable({
    visible: false,
    type: "",
    data: ""
});

let setModal = action((type, info = null) => {

    console.log("set modal");
    data.type = type;
    data.data = info;

    data.visible = true;

    data["333"] = 7
});

let closeModal = action(() => {
    console.log("close modal");

    data.visible = false;
});

const disposer = autorun(() => {
    console.log("changed", data.visible, data.type, data.data);
    trace();
});

export default {data, setModal, closeModal};