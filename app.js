//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "WELCOME TO MY SIMPLE BLOG PROJECT. To create a new post you can click compose.";
const guide =  "To create a new post you can click compose. To see the whole text you can click read more";
const aboutContent = "This blog is using ejs, node.js, express, and mongoDB.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const app = express(); 
const mongoose = require("mongoose");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

mongoose.connect("mongodb+srv://willyfarel131003:****@cluster0.ekkf39f.mongodb.net/blogDB");

const postschema = {
  title : String,
  content: String
}

const Post = mongoose.model("post", postschema);

app.get("/",function(req,res){
  Post.find({})
    .then((post)=>{    
      res.render("home",{textHome: homeStartingContent,guide: guide, posts: post });
    });
});

app.get("/about",function(req,res){
  res.render("about",{textAbout: aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{textContact: contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  const post = new Post({
    title: req.body.textTitle,
    content: req.body.textPost
  });
  post.save();
  Post.findById(post._id)
    .then((found)=>{
      if (found){
      res.redirect("/");}
    })
});

app.get("/posts/:blogId",function(req,res){
  var param = req.params.blogId;
  Post.findById(param)
    .then((found)=>{
      res.render("post",{blogTitle: found.title, blogContent: found.content});
    })
});


