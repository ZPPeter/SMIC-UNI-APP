const TransformPages = require('uni-read-pages')
//const tfPages = new TransformPages() // 包含内容很多
const tfPages = new TransformPages({
    includes:['path','name','meta']
	//includes:['path']
})
module.exports = {
    configureWebpack: {
        plugins: [
            new tfPages.webpack.DefinePlugin({
                ROUTES: JSON.stringify(tfPages.routes)
            })
        ]
    }
}