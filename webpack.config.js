module.exports = {
  entry: [
    './src/index.js'
  ],

  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
    
    {
      test: /\.css$/,
      loader:'style-loader!css-loader'
    },
    {
      test: /\.(ttf|eot|woff|woff2)$/,
      loader: 'file-loader'
    },
    {
      test: /\.svg$/,
      loader: 'svg-inline-loader'
      }]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './public',
    inline: true,
    port : 8080
  }
};
