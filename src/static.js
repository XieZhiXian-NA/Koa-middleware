const fs=require('fs')
const path = require('path')
module.exports = (dirPath='./public')=>{
    console.log('dirpath',dirPath)
    return async (ctx,next)=>{
//         ctx.url /public/static/static.html
//         url F:\node01\node\koa\public
//         filepath F:\node01\node\koa\public/static/static.html
        console.log('ctx.url',ctx.url)
        if(ctx.url.indexOf("/public")===0){
            //public开头  读取文件
            const url = path.resolve(__dirname,dirPath)
            console.log('url',url)
            // path.basename() 方法返回 path 的最后一部分
            //public
            const fileBaseName = path.basename(url)
            ///localhost:3000/public/index.html filepath=/koa/index.html
            const filepath = url+ctx.url.replace("/public","")
            console.log('filepath',filepath)
            try{
                //获取文件状态 是文件夹还是文件
                stats = fs.statSync(filepath) 
                if(stats.isDirectory()){
                    
                    //dir是个数组 包含public文件夹下面所有的文件、文件夹[a.txt,b.html,static]
                    const dir = fs.readdirSync(filepath)
                    const ret=['<div style = "padding-left:20px">']
                    dir.forEach(filename=>{
                        if(filename.indexOf('.') > -1){
                            ret.push(
                                `<p><a style="color:black" href="${ctx.url}/${filename}">${filename}</a></p>`
                            )
                        }else{
                            ret.push(
                                `<p><a href="${ctx.url}/${filename}">${filename}</a></p>`
                                );
                        }
                    })
                    ret.push('</div>')
                    ctx.body = ret.join("")
                }else{
                    const content = fs.readFileSync(filepath)
                    ctx.body =content
                }


            }catch(e){
                ctx.body ="404,not found";
            }

        }else{
            //否则不是静态资源，直接去下一个中间件
            await next()
        }
    }
}