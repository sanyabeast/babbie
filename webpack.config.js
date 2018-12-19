const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeSassMagicImporter = require('node-sass-magic-importer');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const env = process.env.NODE_ENV;
const sourceMap = env === 'development';

const config = {
    devtool: sourceMap ? 'cheap-module-eval-source-map' : undefined,
    entry: path.join(__dirname, 'src', 'index.ts'),
    mode: env,
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        modules: ["src", "src/App", "node_modules"],
        extensions: [ '.tsx', '.ts', '.js' ],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            unicycle: "unicycle/unicycle.js"
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: path.join(__dirname, 'dist', 'index.html'),
            template: path.join(__dirname, 'static', 'index.html'),
            inject: true,
        }),
        new CopyWebpackPlugin([
            { from: 'res', to: 'res' }
        ])
    ],
    module: {
        rules: 
        [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
              }, 
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.join(__dirname, 'src')],
            }, 
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                  appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.scss$/,
                use: 
                [
                    'vue-style-loader',
                    'css-loader', {
                        loader: 'sass-loader',
                    }, 
                    {
                        loader: 'sass-loader',
                        options: {
                            importer: nodeSassMagicImporter(),
                    },
                    },
                ],
            }, 
        ],
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    optimization: {
        minimizer: [new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          terserOptions: {
            ecma: 5,
            warnings: false,
            parse: {},
            compress: {},
            mangle: true, // Note `mangle.properties` is `false` by default.
            module: false,
            output: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_classnames: undefined,
            keep_fnames: false,
            safari10: true
          }
        })]
    },
};

module.exports = config;