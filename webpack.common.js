const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: [
    './src/front/js/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          }
        ]
      }, // CSS only files
      {
        test: /\.(png|svg|jpg|gif|jpeg|webp)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images/' // Opcional: cambiar la carpeta de salida para las imágenes
          }
        }
      }, // For images
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        use: ['file-loader']
      }, // For fonts
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // Expresión regular para tipos de archivos de video
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]', // Nombre del archivo de salida
              outputPath: 'assets/videos/', // Carpeta donde se guardarán los archivos procesados
              publicPath: 'assets/videos/' // Ruta pública para acceder a los archivos
            }
          }
        ]
      } // For video files
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'] // Incluye .jsx si usas JSX
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: '4geeks.ico',
      template: 'template.html'
    }),
    new Dotenv({ safe: true, systemvars: true })
  ]
};
