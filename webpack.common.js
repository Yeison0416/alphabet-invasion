const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const path = require('path');

module.exports = {
    entry: {
        app: './src/index.ts',
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Production',
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new CleanWebpackPlugin(),
        new StyleLintPlugin({
            configFile: '.stylelintrc',
            context: 'src',
            files: '**/*.scss',
            failOnError: false,
            quiet: false,
        }),
        new ESLintPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /[\\/]node_modules[\\/]/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                options: {
                    minimize: true,
                    partialDirs: [],
                },
            },
        ],
    },
};
