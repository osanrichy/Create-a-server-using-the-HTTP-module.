const path = require("path");
const fs = require("fs");
const http = require("http");

const server = http.createServer((request, response)=>{
        let filePath = path.join(__dirname,'public', request.url ==='/' ? 'index.html': request.url)
        let contentType = getContentType(filePath) || 'text/html'
        let emptyPagePath = path.join(__dirname, 'public', '404.html')
        fs.readFile(filePath,'utf8', (err, content)=>{
            if(err){
                if(err.code=== 'ENOENT'){
                    fs.readFile(emptyPagePath, 'utf8', (err, content)=>{
                        response.writeHead(200, {'Content-Type': contentType})
                        response.end(content)
                    })
                }else{
                    response.writeHead(500)
                    response.end(`A server error has occured`)
                }
            }
            if(!err){
                response.writeHead(200, {'Content-Type': contentType})
                response.end(content)
            }
        })
    })
    const getContentType =(filePath)=>{
        let extname = path.extname(filePath)
        if(extname==='.js'){
            return 'text/jaavscript'
        }
    }
const port = 8500
server.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})