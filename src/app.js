const express = require("express");
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT ||  3000
//Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Set up to use hbs and views location
app.set('view engine','hbs')

app.set('views', viewsPath)

hbs.registerPartials(partialsPath)
//Set up static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather',
        name:'Nhu Bui'

    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About',
        name:'Nhu Bui'

    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help',
        content:'This is help page',
        name:'Nhu Bui'


    })
})

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
        error: 'You must provide an address'
        })
  }

  geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
    if(error){
        return res.send({error})
       }

    forecast(latitude,longitude, (error, forecastData) => {
     if(error){
      return res.send({error})
     }
     res.send({
        address: req.query.address,
        forecast: forecastData,
        location
    })
    })
 
});
  
});
app.get('/help/*',(req, res)=>{
    res.render('error',{
        title: 'Help',
        message:'Help page not found',
        name:'Nhu Bui'


    })
})

app.get('/products', (req, res)=>{
    console.log(req.query);

if(!req.query.search){
    return res.send({
    error: 'You must provide a search term'
    })
}
    res.send({
        products:[]
    })
})


app.get('*',(req, res)=>{
    res.render('error',{
        title: 'Help',
        message:'404 page   ',
        name:'Nhu Bui'


    })
})

app.listen(port, () => {
  console.log("Server is up on port 3000");
});
