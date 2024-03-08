const fs = require('fs')

fs.readFile('./docs/text.txt', (error, data)=>{
    if(error){
        console.log(error)
    }
    console.log(data.toString())
})