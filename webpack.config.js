const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   entry: './src/index.tsx',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]-[fullhash].js',
      clean: true,
      publicPath: ""
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
         filename: '[name]-[fullhash].css',
      }),
      new CopyPlugin({
         patterns: [
              { from: "static", to: "static" }
         ],
      }),
   ],
   devServer: {
      port: 5550,
      historyApiFallback: true,
      static: {
         directory: path.join(__dirname, 'dist')
      }
   },
   resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "ts-loader",
            },
          },
         {
            test: /\.scss$/,
            use: [
               MiniCssExtractPlugin.loader,
               "css-loader",
               {
                  loader: "sass-loader",
                  options: {
                     sassOptions: {
                        includePaths: ["node_modules"],
                     },
                  },
               },
            ],
         },
         {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
         },
      ]
   }
};