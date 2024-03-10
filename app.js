const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.set('view engine', 'ejs')

mongoose.connect("mongodb+srv://shubhbhatt101:Shubham123@cluster0.x4lra5n.mongodb.net/")
  .then(() => {
    app.listen(4000)
    console.log("connected to db")
  })
  .catch((error) => {
    console.log('error connecting to database',error)
  })



app.get('/', (req, res) => {
  const blogs = [
    { title: "Fallout 4", snippet: 'lorem impsum dipsum lorem impsum dipsum' },
    { title: "Metro Exodus", snippet: 'lorem impsum dipsum lorem impsum dipsum' },
    { title: "Disohnered 2", snippet: 'lorem impsum dipsum lorem impsum dipsum' },
    { title: "Far Cry 5", snippet: 'lorem impsum dipsum lorem impsum dipsum' },
  ]
  res.render("home", { title: 'Home', blogs })
})
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})


app.get('/about/form', (req, res) => {
  res.render('form')
})


// this was without using template engine such as ejs
// app.get('/aboutMe', (req,res)=>{
//     // res.sendFile('./views/about.html', {root: __dirname})
//     res.redirect('/about')
// })

app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})