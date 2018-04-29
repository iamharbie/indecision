const path = require('path');


module.exports = (env) => {

    const isProduction = env ==='production';

    console.log('env', env)
    return  {
        mode: "development",
        entry: './src/app.js',
        output: {
            path: path.join(__dirname,'public'),
            filename: 'bundle.js'
        },
        module:{
            rules:[{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },{
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
    
            }
        ]
        },
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    
        devServer: {
            contentBase: path.join(__dirname,'public'),
            historyApiFallBack: true
        }
    
    };


}

