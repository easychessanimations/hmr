const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const PORT = 8080

let devPublic = `http://localhost:${PORT}`

try{
    devPublic = require('child_process').execSync('gp url 8080').toString().trim()
}catch(err){

}

module.exports = {
  entry: [
      './src/index.js',
      'webpack-dev-server/client?/',
      'webpack/hot/dev-server'
  ],
  plugins: [
      // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement',
      }),
    ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },    
  devServer: { 
      // make HMR work - start
      host: '0.0.0.0',
      disableHostCheck: true,
      public: devPublic,
      // make HMR work - end
    contentBase: path.join(__dirname, "dist"),    
    port: PORT,
    hot: true,
    watchContentBase: true,        
    watchOptions: {
        poll: true
    },
    open: true
  },
  module: {      
     rules: [
        {
          test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
          use:{
            loader: 'file-loader?name=[name].[ext]'  // <-- retain original file name
          }          
        },
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader',
         ],
       },
       {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
      },
     ],
   },
};