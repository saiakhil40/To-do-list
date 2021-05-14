//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const datee=require(__dirname+"/date.js");

const app = express();
let items=[];
let workitems=[];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function(req, res) {
 let day=datee.getDate();
  res.render("lists", {  listTitle: day, newListitems:items});
});
app.post("/",function(req,res){
  let item =req.body.newItem;
  if(req.body.list==="Work List")
  {
    workitems.push(item);
    res.redirect("/work");
  }
  else{
  items.push(item);
  res.redirect("/");
  }
});
app.get("/work",function(req,res){
  res.render("lists", {  listTitle: "Work List", newListitems:workitems});
});
app.post("/work",function(req,res){
  let item=req.body.newItem;
  workitems.push(item);
  res.redirect("/work");
});
app.get("/about",function(req,res){
  res.render("about");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000.");
});
