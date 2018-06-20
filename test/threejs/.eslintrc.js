module.exports = {
    "extends": "airbnb",
    "plugins": [
        "import"
    ],
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "rules": {

        //eslint 配置

        //缩进设置为4个空格
        "indent": ["error", 4],
        //仅支持在循环末尾使用++、--
        "no-plusplus": ["error", {"allowForLoopAfterthoughts": true}],
        //设置 setter 存在时必须有 getter，有 getter 并不需要一定有 setter
        "accessor-pairs": ["error", {"getWithoutSet": true}],

        //react eslint 配置

        //jsx 缩进为4个空格
        "react/jsx-indent": [4, 4],
        "react/jsx-indent-props": [4, 4]
    },
    "globals": {
        "cc": true,
    }
};