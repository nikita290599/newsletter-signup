const express = require("express");
const bodyParser= require("body-parser");
const request = require("request");
const https=require("https");
const app= express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function(req,res){
res.sendFile(__dirname+"/signup.html");
});


app.post("/", function(req,res){

const firstName = req.body.first;
const lastName = req.body.last;
const email   = req.body.password;
//console.log(password);
const data={
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]

};
var jsonData = JSON.stringify(data);
 const url="https://us2.api.mailchimp.com/3.0/lists/517701a163";

 const options={
   method:"POST",
   auth:"Nikita:4f903f47b78224f04f92cbcfa939b1ed-us2"
 }


const request = https.request(url,options, function(response){

  if(response.statusCode ===200){
    res.sendFile(__dirname+"/success.html");
  }
  else{
    res.sendFile(__dirname+"/failure.html");
  }
 response.on("data",function(data){
   console.log(JSON.parse(data));
 })
})
request.write(jsonData);
request.end();

});

app.listen(process.env.PORT|| 3000, function(){
  console.log("Server running on port 3000");
});

app.post("/failure", function(req,res){
  res.redirect("/");
})
// api key
// 5f993eb82768f49dd0e50eb4394239fa-us2

//list ID: 517701a163
