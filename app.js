const express = require ("express");
const https = require ("https");
const bodyParser = require ("body-parser");
const request = require ("request")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname +"/index.html")
    });

app.post("/", function (req, res){

    const query = req.body.cityName
    const apiKey = "b6a72cdd653e69ebe74dfcb51937a534"
    const units = "metric"
 const url = "https://api.openweathermap.org/data/2.5/weather?q="
 +query+"&appid="+apiKey+"&units="+units;


 https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
     const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp
    const desc = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
        
  res.write("<h1>The conditions are "+desc+"</h1>");
  res.write("<h1>The temperature in "+query+" is "+ temp +" dungarees celsius. </h1>");
  res.write("<img src="+imageURL+">");
  res.send()


    })
    })


})
app.listen(3000, function(){
console.log("Server is runnming on port 3000.")
});