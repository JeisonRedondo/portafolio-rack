const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:'./src/index.js',
  output:{
    path: path.resolve(__dirname,j 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules:[
      {
        test:/\.(js|jsx)$/,
        exclude: /node_modules/,
        use:{
          loader:'babel-loader' //Aqui usamos el cargador de babel 
        }, 
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader'],
      },
    ],
  },
  resolve:{
    extensions:['.js','.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:'./src/index.html',
    }),
  ],
  devServer:{
    static: './dist',
  },
  mode: 'development',
};
