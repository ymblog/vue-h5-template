const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');
function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, 'src/assets/css/base.less'),
                path.resolve(__dirname, 'src/assets/css/layout.less')
            ]
        })
}
module.exports = {
    publicPath:'./',
    productionSourceMap:false,
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
       
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            },
            postcss: {
                plugins: [require('postcss-px2rem')({
                    remUnit: 75
                })]
            }

        }
    },
    configureWebpack:{
        plugins:[
            new SpritesmithPlugin({
                // 目标小图标
                src: {
                    cwd: path.resolve(__dirname,'./src/assets/sprite'),
                    glob: '*.png'
                },
                // 输出雪碧图文件及样式文件
                target: {
                    image: path.resolve(__dirname, './src/assets/images/sprite.png'),
                    css: [[path.resolve(__dirname, './src/assets/css/sprite.less'),{format:'function_based_template'}]]
                },
                customTemplates: {
                  'function_based_template': path.resolve(__dirname, './src/utils/my_handlebars_template.handlebars')
                },
                // 样式文件中调用雪碧图地址写法
                apiOptions: {
                    cssImageRef: '../images/sprite.png'
                },
                spritesmithOptions: {
                    algorithm: 'binary-tree',
                    padding:10
                }
            })
        ]
    }
}