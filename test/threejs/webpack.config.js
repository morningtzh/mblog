const
    path = require('path'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    mode: 'development',

    entry: './src/app.js',
    output: {
        path: `${__dirname}/dist/`,
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react', 'stage-1'],
                    plugins: [
                        ['import', [{ libraryName: 'antd', style: 'css' }]],
                        ['transform-decorators-legacy'],
                    ],
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'less-loader',
                ],
            },

            {
                test: /\.(css|sass)$/,
                loader: 'style-loader!css-loader',
            },

            {
                test: /\.json$/,
                loader: 'json-loader',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Vision',
            favicon: './public/favicon.ico',
            template: './public/index.html',
            inject: true, // 允许插件修改哪些内容，包括head与body

        }),
    ],
};
