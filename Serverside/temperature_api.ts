
exports.temperature_api = function (app, pool){
    var response
    get_temperature_data_from_database()
    setInterval(function(){
        get_temperature_data_from_database()
    }, 30000)
    async function get_temperature_data_from_database() {
        let conn
        try{
            conn = await pool.getConnection(); 
            const rows = await conn.query("SELECT AMBIENT_TEMPERATURE, GROUND_TEMPERATURE, CREATED FROM WEATHER_MEASUREMENT;")
            console.log(rows)
            response = rows

        }catch(err){
            throw err 
        }finally{
            if(conn) return conn.end()
        }
    }
    app.get('/temperature_api', function (req, res){
        res.send(response)
    }); 
}
