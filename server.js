import http from 'http';
import fs from 'fs/promises';
import url from 'url'
import path from 'path'
const PORT = process.env.PORT;

// Get Current Path in es
// __filename gives current filename with path
// __dirname gives the path of current file
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

console.log(__dirname)
console.log(__filename)
const server = http.createServer(async (req, res)=>{
    // res.setHeader('Content-Type', 'text/html');
    // res.statusCode = 404;
    // console.log(req.url)
    // console.log(req.method)
    // res.writeHead(500,{'Content-Type': 'application/json'});
    try{
        if(req.method === 'GET'){
            let filepath;
            if(req.url === '/'){
                filepath = path.join(__dirname, 'public', 'index.html')
                
            }else if (req.url === '/about'){
                filepath = path.join(__dirname, 'public', 'about.html')
                
            }else{
                throw new Error('Not Found')
            }
            const data = await fs.readFile(filepath)
            res.setHeader('Content-Type','text.html');
            res.write(data);
            res.end();
        }else{
            throw new Error('Method not Allowed')
        }
    }catch(error){
        res.writeHead(500,{'Content-Type': 'text/plain'})
        res.end('Server Error')
    }

    // res.end('<h1>Hello World!</h1>');
})


server.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})