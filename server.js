const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log("request made!")
    console.log(req.url, req.method)

    res.setHeader('Content-Type', 'text/html')
    // res.write('<h1>Hello </h1> ')
    // res.write('<h1>Bitches!</h1>')
    // res.end()

    let path = req.url;
    const path2 = "./views";

    switch(path){
        case  '/index':  path = path2 + '/index.html';
        res.statusCode=200
        break;
        case '/about' : path = path2 + '/about.html';
        res.statusCode=200
        break;
        case '/aboutMe': 
             res.statusCode =301
             res.setHeader('Location', '/about')
             res.end()
          break;

        default: path = path2 + '/404.html'
        res.statusCode =404
       
    }

    fs.readFile(path, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            // res.write(data)
            res.end(data)
            
        }
    })
})

server.listen(3000, 'localhost', () => {
    console.log('Server is running at port 3000!')
})