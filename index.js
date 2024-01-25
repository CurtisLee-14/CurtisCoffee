import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/menu", (req, res) => {
  res.render("menu.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/signup", (req,res) => {
  res.render("signup.ejs");
});

app.get("/success", (req,res) => {
  res.render("success.ejs");
});

app.get("/fail", (req,res) => {
  res.render("fail.ejs");
});

app.post("/signup1", (req,res) => {
  const {email} = req.body;

  if(!email) {
    res.redirect("/signup");
    return;
  }

  const data = {
    members: [
      {
        email_address: email,
        email_type: 'html',
        status: 'subscribed'
      }
    ]
  }

  const postData = JSON.stringify(data);

  const options = {
    url: 'https://us21.api.mailchimp.com/3.0/lists/ff65e72c17',
    method: 'POST',
    headers: {
      Authorization: 'auth 3ce87ac77960bfa7f1cc1d806dc5a9e2-us21'
    },
    body: postData
  }

  request(options, (err, response, body) => {
    if(err){
      res.redirect("/fail");
    }
    else{
      if(response.statusCode === 200){
        res.redirect("/success");
      }
      else{
        res.redirect("/fail");
      }
    }
  });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});