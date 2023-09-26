// var air_data_api = require("./air_data_api.ts")
// var rain_api = require("./rain_api.ts")
// var all_data_api = require("./all_data_api.ts")
// var temperature_api = require("./temperature_api.ts")
// var wind_data_api = require("./wind_api.ts")
var latest_data = require("./latest_data_api.ts")

const mariadb = require('mariadb');
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const port = 5000 

const pool = mariadb.createPool({
    host: 'localhost', 
    user:'user', 
    password: 'Justo slaptazodis',
    database: 'weather',
    acquireTimeout: 1000,
    connectionLimit: 5
});

// air_data_api.air_data_api(app, pool)
// rain_api.rain_api(app, pool)
// temperature_api.temperature_api(app, pool)
// wind_data_api.wind_api(app, pool)
// all_data_api.all_data_api(app, pool)
latest_data.latest_data(app, pool)

app.listen(port, function(){
    console.log(`Example app listening on port ${port}!`)
});