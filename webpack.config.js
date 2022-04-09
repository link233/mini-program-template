const path = require('path')
const babel = require('@babel/core')
const sass = require('sass')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// 路径处理函数
function resolve (dir) {
  return path.join(__dirname, dir)
}

// 创建 copy-webpack-plugin 插件的实例对象
const copyPlugin = new CopyWebpackPlugin({
  patterns: [
    { from: '**/*.wxml', to: './', context: './src', noErrorOnMissing: true },
    { from: '**/*.wxss', to: './' , context: './src', noErrorOnMissing: true},
    { from: '**/*.wxs', to: './' , context: './src', noErrorOnMissing: true},
    { from: '**/*.json', to: './', context: './src', noErrorOnMissing: true },
    { from: '**/*.jpg', to: './', context: './src', noErrorOnMissing: true },
    { from: '**/*.png', to: './', context: './src', noErrorOnMissing: true },
    { from: '**/*.css', to: '[path][name].wxss' , context: './src', noErrorOnMissing: true},
    {
      from: '**/*.scss',
      to: '[path][name].wxss', // 给文件改名
      context: './src',
      noErrorOnMissing: true,
      transform (content, absoluteFrom) {
        // sass.renderSync 将在 v2.0.0 版本弃用
        // const result =  sass.renderSync({ file: absoluteFrom })

        const result =  sass.compile(absoluteFrom)
        const value = result.css.toString()

        return Promise.resolve(value)
      }
    },
    {
      from: '**/*.js',
      to: './',
      context: './src',
      globOptions: {
        // 忽略测试文件
        ignore: ['*.test.js', '*.spec.js']
      },
      /**
       * @description 可以在文件复制的过程中对文件内容进行处理
       * @param {Buffer} content 参数是一个 [`Buffer`] 对象；它可以转换为 `String` 以使用 `content.toString()` 进行处理
       * @param {string} absoluteFrom 文件被复制的绝对路径
       */
      transform (content, absoluteFrom) {
        /**
         * @description ES 6语法转换，transformSync 语法：
         * @param {string} code 原始 JavaScript 代码字符串
         * @param {object} opts 代码编译的配置项
         * @returns {*} 返回值为编译结果对象，它的属性 code 就是最终代码的字节流
         */
        const newCode = babel.transformSync(content, {
          babelrc: true,
          "presets": ["@babel/env"]
        }).code

        // 注意，transform() 函数的返回值是 Promise
        return Promise.resolve(newCode.toString())
      }
    }
  ],
  options: { concurrency: 100 }
})

// 用于 删除/清理 构建文件夹
const cleanPlugin = new CleanWebpackPlugin()

module.exports = {
  mode: 'development', // 编译模式设置为development
  entry: resolve('./src/app.js'),
  output: {
    path: resolve('./dist')
  },
  plugins: [ copyPlugin, cleanPlugin ],
  module: {}
}
