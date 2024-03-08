const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.listen(4000)

app.get('/', (req,res)=>{
  const blogs = [
    {title: "Fallout 4", snippet: 'lorem impsum dipsum lorem impsum dipsum'},
    {title: "Metro Exodus", snippet: 'lorem impsum dipsum lorem impsum dipsum'},
    {title: "Disohnered 2", snippet: 'lorem impsum dipsum lorem impsum dipsum'},
    {title: "Far Cry 5", snippet: 'lorem impsum dipsum lorem impsum dipsum'},
  ]
    res.render("home",{title:'Home', blogs})
})
app.get('/about', (req, res)=>{
  res.render('about', {title:'About'})
})


app.get('/about/form', (req,res)=>{
  res.render('form')
})


// this was without using template engine such as ejs
// app.get('/aboutMe', (req,res)=>{
//     // res.sendFile('./views/about.html', {root: __dirname})
//     res.redirect('/about')
// })

app.use((req,res)=>{
    res.status(404).render('404', {title:'404'})
})