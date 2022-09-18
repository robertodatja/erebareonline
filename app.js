//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

//------------------------------------------------------------------------------
const homeStartingContent = "Erebara is one of the most beautiful villages in Albania. It is part of the Maqellara municipality in the Diber district. "+
"Erebara is located at an elevation of 962 meters above sea level. It is situated nearby to Herbel village, and south of Trepçë village. "+
"Erebara is also known as Erebara, Erebare, Erebarë.";

const aboutContent = " Erebara stands out for many things, below we mention some of them:"

const contactContent = "You can contact us through the pages below:";
//------------------------------------------------------------------------------

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
 extended: true
}));
app.use(express.static("public"));

let posts = [];

/*------------------------------Challenges-----------------------------------*/
app.get("/", function(req, res) {
 //res.render("home"); //Challenge1
 res.render("home", {
  startingContent: homeStartingContent, //Challenge2
  posts_array: posts //Challenge12
 })
 // console.log(posts);//Challenge11
});

app.get("/about", function(req, res) {
 res.render("about", {
  aboutContent_key: aboutContent
 }) //Challenge5.1
});

app.get("/contact", function(req, res) {
 res.render("contact", {
  contactContent_key: contactContent
 }) //Challenge5.2
});

app.get("/compose", function(req, res) {
 res.render("compose") //Challenge7
});



app.post("/compose", function(req, res) {
 // console.log(req.body.postTItle);//Challenge8

 const postJSobject = { //Challenge10
  title: req.body.postTitle,
  content: req.body.postBody
 }

 //Challenge11
 posts.push(postJSobject);
 res.redirect("/");
});

//Challenge16
app.get("/posts/:postName", function(req, res) {
 //console.log(req.params.postName);

 //Challenge17
 const requestedTitle = _.lowerCase(req.params.postName); //Challenge18
 posts.forEach(function(element) {
  const storedTitle = _.lowerCase(element.title); //Challenge18
  if (requestedTitle === storedTitle) {
   // console.log("Match Found");

   //Challenge19
   res.render("post", {
    titleKey: element.title,
    contentKey: element.content
   });

  } else {console.log("Not a Match");}
 });

});


app.listen(process.env.PORT || 3000, function() { //0
 console.log("The server is running on port 3000");
});
