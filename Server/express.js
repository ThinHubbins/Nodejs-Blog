const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blogpost = require("./models/blog");
require('dotenv').config();


const app = express();
const dbURI = process.env.myURI

mongoose  
  .connect(dbURI)
  .then((result) => {
    app.listen(3000);
    console.log("Connected");
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", "html");

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/blogs", (req, res) => {
  Blogpost.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs", { title: "Blogs", blogout: result });
    })
    .catch((err) => console.log(err));
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/add-blog", (req, res) => {
  res.render("Add-Blog", { title: "Add-Blog" });
});
app.post('/blogs', (req, res)=>{
  const addblog = new Blogpost(req.body)
  addblog.save().then((result)=>{
    res.redirect('/blogs')
  }).catch(err => console.log(err))
})
app.get('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    Blogpost.findById(id).then((result)=>{
        res.render('readmore', {title: 'Readmore', Blogs: result})
    }).catch((err)=> console.log(err))
})
app.delete('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    Blogpost.findByIdAndDelete(id).then(result => {
        res.json({ redirect: '/blogs' })
    }).catch(err =>{
        console.log(err);
        
    })
})

// app.get("/blog", (req, res) => {
//   const blogs = [
//     {
//       title: "Getting Started with JavaScript",
//       author: "Kosi",

//     },
//     {
//       title: "Understanding React Components",
//       author: "Fredrick",
//     },
//   ];

//   res.render("blog", { title: "blog", blogs });
// });

app.use((req, res) => {
  res.status(404).render("error", { title: "404" });
});
