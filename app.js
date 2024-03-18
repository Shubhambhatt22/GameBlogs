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

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.redirect('blogs')
})

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('home', { title: 'Home', blogs: result })
    })
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

app.get('/create', (req, res) => {
  res.render('create', { title: 'Form' })
})

app.post('/add-blog', (req, res) => {

  if (!req.body) {
    console.log('Data is empty')
  }
  else {
    const blog = new Blog(req.body)
    blog.save()
      .then((result) => {
        res.redirect('blogs')
      })
      .catch((error) => {
        console.log(error)
      })
  }
})

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render('detail', { title: 'Blog detail', blog: result })
    })
    .catch((error) => {
      console.log(error)
    })
})

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs' })
    })
    .catch((error) => console.log(error))
})

// this was without using template engine such as ejs
// app.get('/aboutMe', (req,res)=>{
//     // res.sendFile('./views/about.html', {root: __dirname})
//     res.redirect('/about')
// })

app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})