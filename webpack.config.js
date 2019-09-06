var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')
var VueLoaderPlugin = require('_vue-loader@15.7.1@vue-loader/lib/plugin.js')
module.exports = {
  entry:path.join(__dirname,'./src/main.js'),
  output:{
    path:path.join(__dirname,'./dist'),
    filename:'bundle.js'
  },
  plugins:[
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({
      template:path.join(__dirname,'./src/index.html'),
      filename:'index.html'
    })
  ],
  module:{
    rules:[
      {test:/\.css$/,use:['style-loader','css-loader']},
      {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
      {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
      {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=5928&name=[hash:8]-[name].[ext]'},
      {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},
      {test:/\.js$/,use: 'babel-loader',exclude: /node_modules/ },
      {test:/\.vue$/,use: 'vue-loader'}
      // {test:/\.vue$/,use: 'vue-loader@14'}
    ]
  },
  resolve:{
    alias:{
      // "vue$":"vue/dist/vue.js"
    }
  }
}