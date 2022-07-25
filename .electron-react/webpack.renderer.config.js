'use strict'
const IsWeb = process.env.BUILD_TARGET === 'web'
process.env.BABEL_ENV = IsWeb ? 'web' : 'renderer'

const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const { styleLoaders } = require('./utils')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}


let rendererConfig = {
  infrastructureLogging: { level: 'warn' },
  entry: {
    renderer: resolve('src/renderer/index.tsx')
  },
  externals: [
  ],
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: 'imgs/[name]--[hash].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: 'media/[name]--[hash].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: 'fonts/[name]--[hash].[ext]'
        }
      }
    ]
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env.TERGET_ENV': JSON.stringify(config[process.env.TERGET_ENV]),
      'process.env': process.env.NODE_ENV === 'production' ? config.build.env : config.dev.env,
      'process.env.IS_WEB': IsWeb
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('src/index.ejs'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true
      },
      templateParameters(compilation, assets, options) {
        return {
          compilation: compilation,
          webpack: compilation.getStats().toJson(),
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            files: assets,
            options: options
          },
          process,
        };
      },
      nodeModules: false
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  output: {
    filename: '[name].js',
    path: IsWeb ? path.join(__dirname, '../dist/web') : path.join(__dirname, '../dist/electron')
  },
  resolve: {
    alias: {
      '@': resolve('src/renderer'),
    },
    extensions: ['.tsx', ".js", '.jsx', '.ts', '.json', '.css', '.node']
  },
  target: 'electron-renderer'
}
rendererConfig.module.rules = rendererConfig.module.rules.concat(styleLoaders({ sourceMap: process.env.NODE_ENV !== 'production' ? config.dev.cssSourceMap : false, extract: IsWeb, minifyCss: process.env.NODE_ENV === 'production' }))
IsWeb ? rendererConfig.module.rules.push({ test: /\.ts[x]?$/, use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }] }) : rendererConfig.module.rules.push({ test: /\.ts[x]?$/, use: [{ loader: 'esbuild-loader', options: { loader: 'tsx' } }] })


/**
 * Adjust rendererConfig for development settings
 */
if (process.env.NODE_ENV !== 'production' && !IsWeb) {
  rendererConfig.plugins.push(
    new webpack.DefinePlugin({
      __lib: `"${path.join(__dirname, `../${config.DllFolder}`).replace(/\\/g, '\\\\')}"`
    })
  )
}

/**
 * Adjust rendererConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {

  rendererConfig.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../static'),
          to: path.join(__dirname, '../dist/electron/static'),
          globOptions: {
            ignore: ['.*']
          }
        }
      ]
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      'process.env.libPath': `"${config.DllFolder}"`
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  )
  rendererConfig.optimization = {
    minimizer: [
      new ESBuildMinifyPlugin({
        sourcemap: false,
        minifyWhitespace: true,
        minifyIdentifiers: true,
        minifySyntax: true,
        css: true
      })
    ]
  }
  if (IsWeb) {
    rendererConfig.optimization.splitChunks = {
      chunks: "async",
      cacheGroups: {
        vendor: { // 将第三方模块提取出来
          minSize: 30000,
          minChunks: 1,
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 1
        },
        commons: {
          test: /[\\/]src[\\/]common[\\/]/,
          name: 'commons',
          minSize: 30000,
          minChunks: 3,
          chunks: 'initial',
          priority: -1,
          reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
        }
      }
    }
    rendererConfig.optimization.runtimeChunk = { name: 'runtime' }
  }
} else {
  rendererConfig.devtool = 'eval-source-map'

}
module.exports = rendererConfig
