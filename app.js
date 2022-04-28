const express = require ("express");
const res = require("express/lib/response");
const https = require ("https");

const app = express();



app.get("/", function(req, res){

    const url = "https://api.openweathermap.org/data/2.5/weather?q=belgrade&units=metric&appid=b6a72cdd653e69ebe74dfcb51937a534";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
           const weatherData = JSON.parse(data)
           const temp = weatherData.main.temp
           console.log(temp);
            const weatherDescription = weatherData.weather[0].description
            const weatherID = weatherData.weather[0].icon;
            console.log(weatherID);

            res.set("Content-Type", "text/html");
            res.write("<img src='"+"http://openweathermap.org/img/wn/" + weatherID + "@2x.png" + "'>");
            res.write("<p>The weather is "+ weatherDescription + " over the city</p>");
            res.write("<h1>The temperature in Beograd is "+temp + " dungarees Celsius</h1>")
            res.send();
        })
    });


})


app.listen(3000, function(){
    console.log("server is runnming on port 3000.")
});

