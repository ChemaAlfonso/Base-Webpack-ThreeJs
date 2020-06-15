const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    plugins: [
      new HtmlWebpackPlugin({  
        filename: 'index.html',
        template: './index.html',
        hash: true
      }),
      new MiniCSSExtractPlugin({
        filename: "./assets/css/styles.css",
      })
    ],
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css?$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss?$/,
                loader: [
                    MiniCSSExtractPlugin.loader,
                    "css-loader",
                    'sass-loader'
                  ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};