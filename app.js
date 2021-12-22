const express= require("express");
const bodyParser= require("body-parser");
const ejs= require("ejs");
var _ = require('lodash');
const mongoose= require("mongoose");
const { Schema } = mongoose;

const app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB");

const blogSchema= new Schema({
  title: String,
  ParaA: String,
  ParaB: String,
  ParaC: String
});

const Blog = mongoose.model('Blog', blogSchema);

app.get("/",function(req,res){
    Blog.find({},function(err,docs){
      if(err){
        console.log(err);
      } else{
        res.render('body',{list: docs});
      }
    });
  });


app.get("/home",function(req,res){
  res.render('body');
});

app.get("/contact",function(req,res){
  res.render('contact');
});

app.get("/projects",function(req,res){
  res.render('projects');
});

app.get("/compose",function(req,res){
  res.render('compose');
});

app.get("/:id",function(req,res){
  Blog.findOne({_id: req.params.id},function(err,docs){
    if(!err){
      res.render('post',{blogPost: docs});
    }
  });
});

app.post("/compose",function(req,res){
  const blogPage= new Blog({
    title: req.body.title,
    ParaA: req.body.A,
    ParaB: req.body.B,
    ParaC: req.body.C
  });
  blogPage.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });

});


app.listen(3000,function(){
  console.log("Server started at port 3000");
});
