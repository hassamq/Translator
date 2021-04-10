const express = require("express");
const app = express();
const path=require("path");
const bodyParser=require("body-parser");
const say=require("say");


const ejsMate=require("ejs-mate");
const { get } = require("http");
app.engine('ejs',ejsMate);

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+'/public'));

const translate = require('@vitalets/google-translate-api');




const PORT = process.env.PORT || 5000;


app.get('/',(req,res) => {
  res.render('speechtranslator',{title:"Translator",translated:""})
})

app.post('/',(req,res) => {

  console.log(req.body.speech)
  // say.speak(req.body.speech);
  translate(req.body.speech, {to: req.body.language}).then(response => {
    
    res.render('speechtranslator',{title:"Translator",translated:response.text})
}).catch(err => {
    console.error(err);
});

})


app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});