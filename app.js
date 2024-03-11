const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const app = express()

app.set('view engine', 'ejs')

mongoose.connect("mongodb+srv://shubhbhatt101:Shubham123@cluster0.x4lra5n.mongodb.net/")
  .then(() => {
    app.listen(4000)
    console.log("connected to db")
  })
  .catch((error) => {
    console.log('error connecting to database', error)
  })



app.get('/', (req, res) => {
  res.redirect('blogs')
})

app.get('/blogs',(req,res)=>{
 Blog.find()
 .then((result)=>{
  res.render('home', {title:'Home', blogs:result})
 })
})

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((error) => {
//       console.log(error)
//     })
// })

// app.get('/single-blog', (req, res) => {
//   Blog.findById("65ef0034268359ff60124112")
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((error) => {
//       console.log(error)
//     })
// })

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'Dishonered 2',
    snippet: 'Embark on a stealthy journey through the captivating world of Dishonored 2.',
    body: ` Dishonored 2, developed by Arkane Studios, is a stealth-action adventure game that continues the tale
    of the supernatural assassin Corvo Attano. Set in the city of Karnaca, players can also choose to play
    as Emily Kaldwin, the rightful heir to the throne. Released in 2016, the game offers a rich narrative,
    intricate level design, and a variety of gameplay choices.`
  })
  blog.save()
    .then((result) => {
      res.send(result)
    })
    .catch((error) => {
      console.log(error)
    })
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