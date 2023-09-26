
exports.wind_api = function (app, pool){
    var response
    get_wind_data_from_database()
    setInterval(function(){
        get_wind_data_from_database()
    }, 30000)
    async function get_wind_data_from_database() {
        let conn
        try{
            conn = await pool.getConnection(); 
            const rows = await conn.query("SELECT WIND_DIRECTION, WIND_SPEED, WIND_GUST_SPEED, CREATED FROM WEATHER_MEASUREMENT;")
            console.log(rows)
            response = rows

        }catch(err){
            throw err 
        }finally{
            if(conn) return conn.end()
        }
    }

    app.get('/wind_api', function (req, res){
        res.send(response)
    }); 
}
