
exports.rain_api = function (app, pool){
    var response
    get_rain_data_from_database()
    setInterval(function(){
        get_rain_data_from_database()
    }, 30000)

    async function get_rain_data_from_database() {
        let conn
        try{
            conn = await pool.getConnection(); 
            const rows = await conn.query("SELECT RAINFALL, CREATED FROM WEATHER_MEASUREMENT;")
            console.log(rows)
            response = rows

        }catch(err){
            throw err; 
        }finally{
            if(conn) return conn.end()
        }
    }

    app.get('/rain_api', function (req, res){
        res.send(response)
    }); 
}
