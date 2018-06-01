const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
var port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrnetYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (message) => {
  return message.toUpperCase();
});
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Could not write log to file server.log');
    }
  });
  console.log(log);
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// });

app.get('/',(req,res) =>{
  //res.send('<h1>Hello from Express!</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my Express Website'
  });
});

app.get('/about',(req,res) => {
    res.render('about.hbs',{
      pageTitle: 'About Page',
    });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Could not fulfill http request'
  });
});

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
