//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hello World!  Welcome to my dive into web developement.  ";
const aboutContent = "This is going to be my content area(attach git hub once it is filled, put in projects)";
const contactContent = "If you would like to contact me, please enter your informtion in the form below and I will return your message at the earliest opportunity.  Thank you!";
const projectsContent = "Projects that you have worked on should be added here in different accessable fuctioning features to highlight your work"

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(bodyParser.json());

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/projects", function(req, res){
  res.render("projects", {projectsContent: projectsContent});
});


/* testing adding mailchimp API




app.post("/", function(req, res){

//creating variable to collect inputs from client side((div name="input"))

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

//creating data object to be able to merge https/server

    const data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }
      ]
    };

//creates the json Data as a string to send to mailchimp

    const jsonData = JSON.stringify(data);

//creats the constant for the url connected to mailchimp

    const url = "https://us6.api.mailchimp.com/3.0/lists/6042b002b1"

//creating options which are going to be a javascript object
//most important option is the method
//now that the methods and the API Key is in place, this gives the request below a route

    const options = {
      method: "POST",
      auth: "breck1:d4fc8374241b0fc06d3a380ca97f4b70-us6"
    }

//creating the request
//turned https request into a constant to handle future requests

    const request = https.request(url, options, function(response) {

//setting up status codes

      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }

//creating the response in a parsed JSON data object

      response.on("data", function(data) {
        console.log(JSON.parse(data));
      });
    });

//this writes the jsonData and sends to mailchimp

    request.write(jsonData);

//this ends the request
    request.end();

});

//adding a post request for the failure route

app.post("/failure", function(req, res) {
  res.redirect("/");
});

//naming the port that the server is running on
//changed from port 3000 to process.env.PORT || 3000 to connect web app with Heroku or locally on port 3000


//API Key
//d4fc8374241b0fc06d3a380ca97f4b70-us6
//List Id
//6042b002b1




*/





app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
