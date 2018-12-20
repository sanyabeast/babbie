const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeSassMagicImporter = require('node-sass-magic-importer');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const JsDocPlugin = require('jsdoc-webpack4-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const notifier = require('node-notifier');
const autoprefixer = require('autoprefixer');

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
        modules: ["src", "src/App", "node_modules", "res"],
        extensions: [ '.tsx', '.ts', '.js' ],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            axios : "axios/dist/axios.min",
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
        ]),
        new JsDocPlugin({
            conf: './jsdoc.conf'
        }),
        new DashboardPlugin(),
        new BundleAnalyzerPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new CleanWebpackPlugin(["dist"])
    ],
    module: {
        rules: 
        [
            /** vue */
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        ts: 'ts-loader',
                        scss: [
                            "vue-style-loader",
                            "css-loader",
                            {
                                loader: "postcss-loader",
                                options: {
                                    plugins: [
                                        autoprefixer({
                                            browsers:['ie >= 8', 'last 4 version']
                                        })
                                    ],
                                    sourceMap: true
                                }
                            },
                            "sass-loader"
                        ]
                    },
                    esModule: true
                }
            }, 
            /** js */
            {
                test: /\.js$/,
                use: ["thread-loader", 'babel-loader'],
                include: [path.join(__dirname, 'src')],
            }, 
            /** ts */
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader", 
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                        }
                    }
                ]
            },
            /** file */
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            /** cpp */
            {
                test: /\.(c|cpp)$/,
                use: {
                    loader: 'cpp-wasm-loader',
                    options: {
                        // emccFlags: (existingFlags: string[], mode?: "wasm"|"asmjs" ) => string[],
                        // emccPath: String,
                        // fetchFiles: Boolean, 
                        // memoryClass: Boolean,
                        // asmJs: Boolean, 
                        // wasm: Boolean,
                        // fullEnv: Boolean
                    }
                }
            },
            /** wasm */
            { test: /\.wasm$/, loader: "wasm-loader" },
            /* scss */
            {
                test: /\.scss$/,
                use: 
                [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['ie >= 8', 'last 4 version']
                                })
                            ],
                            sourceMap: true
                        }
                    },
                    'sass-loader'
                ],
            }, 
            /** yaml */
            { test: /\.yaml$/, include: [path.join(__dirname, 'res')], use: ["json-loader", 'yaml-loader'] },
            /** xml */
            { test: /\.xml$/, include: [path.join(__dirname, 'res')], loader: 'xml-loader' },
            /** coffee */
            { test: /\.coffee$/, use: [ 'coffee-loader' ] },
            /** json */
            // { test: /\.json$/, loader: 'json-loader' }
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