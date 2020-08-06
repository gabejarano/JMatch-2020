module.exports = {
    entry:'./src/app/index.js',
    output:{
        path: __dirname +'/src/public',
        filename: 'bundle.js'
    },
    module:{
        rules:[{
            use: "babel-loader",
            test: /\.js$/,
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },
        {
            test: /\.(png|woff|woff2|eot|ttf|svg|gif|jpg)$/, 
            loader: 'url-loader?limit=100000'
        }]
    }
};