const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const Blogpost = require("./models/blog");
require("dotenv").config();

const app = express();

// ✅ Environment variables
const dbURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

// ✅ MongoDB connection
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

// ✅ View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "html"));

// ✅ Middleware
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
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

app.post("/blogs", (req, res) => {
  const postblogs = new Blogpost(req.body);
  postblogs.save().then(() => {
    res.redirect("/blogs");
  });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blogpost.findById(id)
    .then((result) => {
      res.render("readmore", { title: "Read", Blogs: result });
    })
    .catch((err) => console.log(err));
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blogpost.findByIdAndDelete(id)
    .then(() => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

// ✅ 404 page
app.use((req, res) => {
  res.status(404).render("error", { title: "404" });
});
