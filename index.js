const express= require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app=express();

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/',function(req,res){
res.sendFile(__dirname + "/index.html");
});

app.post('/',function(req,res){

let location=req.body.cityName;
let url="https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=20e1a7817c4af49921c9862e97370c50&units=metric";


https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data",(data)=>{
        const weatherData=JSON.parse(data);
        //console.log(weatherData);
        const temp=weatherData.main.temp;
      //  console.log(temp);
      const weatherDescription=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const image="http://openweathermap.org/img/wn/" +icon+"@2x.png";
        res.write("<p>The weather is currently " + weatherDescription +"</p>")
        res.write("<h1>The current temperature of " + location +" is "+ temp +" degree Celcius.</h1>");
        res.write("<img src="+image+">");
        res.send();
   })
   
})
})



app.listen(8000,function(req,res){
    console.log("server is listening on port 8000")
});