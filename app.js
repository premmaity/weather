const express = require("express");
const https =require("https");
const bodyparser=require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({extended:true})); 

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
// app.post("/",function(req,res){
//     console.log("post recieve")
// })
app.post("/",function(req,res){
    var q= req.body.cityname;
    console.log(q);
    // res.send("q")
    const url="https://api.openweathermap.org/data/2.5/weather?q="+q+"&appid=2afeb81853216ffe0fa555c05adb2e41&units=metric";
     
     https.get(url,function(response){
        // console.log(response);
        response.on("data",function(data){
            //console.log(data);
            const weatherdata=JSON.parse(data)
            //console.log(weatherdata);
            const temperature=weatherdata.main.temp  
            // //console.log(temp);        
            const condn=weatherdata.weather[0].description 
            // // console.log(temp); 
            const imgurl=" https://openweathermap.org/img/wn/"+weatherdata.weather[0].icon+"@2x.png"         
            res.write("<p><em>the temperatur of "+q+" is - </em>"+temperature+"</p>");
            res.write("the condn is - "+condn+"<p></p>");
            res.write("<img src="+imgurl+" width=50>");
            res.send()
        })
        
    })
})

app.listen(3000,function(){
    console.log('listening on port 3000');
})