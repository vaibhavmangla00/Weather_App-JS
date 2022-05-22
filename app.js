const express = require('express')
const bodyParser = require('body-parser')
const https = require("https")
ejs = require('ejs');

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public/"))

app.set('view engine', 'ejs');

app.get("/",function(req,res){
    res.render("home")
    
})

app.post('/',function (req,res) {
    const city = req.body.city
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=c9dfa8f29c97814b3f0a6c92a2470d4c&units=metric"
    
    https.get(url,function (response) { 
        response.on("data",function(data){
            const weatherdata = JSON.parse(data)
            const temp = weatherdata.main.temp
            const description = weatherdata.weather[0].description
            const image = weatherdata.weather[0].icon
            const imageurl = "http://openweathermap.org/img/wn/"+image+"@2x.png"
            res.render("weather",{description:description,city:weatherdata.name,temp:temp,imageurl:imageurl})
            
            // res.write("<p>The weather is currently "+description+"</p>")
            // res.write("<h1>The temperature in "+weatherdata.name+" is "+temp+"</h1>")
            // res.write("<img src="+imageurl+">")
            // res.send()
        })
     })
})

    


app.listen(8080,function(){
    console.log("Server Started")
})