const CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    AutoPrefixer = require('autoprefixer'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        './js/main.js'
    ],

    output: {
        filename: './js/main.js'
    },

    devServer: {
        port: 9999,
        open: true
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.less', '.js']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ]
                        }
                    }, 'eslint-loader'
                ]

            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                AutoPrefixer({
                                    browsers: [
                                        'ie >= 9', 'last 3 version'
                                    ]
                                })
                            ]
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            }
        ]
    },

    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
            new UglifyJsPlugin({
                sourceMap: true
            })
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            minify: {
                useShortDoctype: true,
                removeStyleLinkTypeAttributes: true,
                removeScriptTypeAttributes: true,
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/style.css'
        }),
        new CopyWebpackPlugin([
            {from: './images', to: 'images'}
        ])
    ]
};