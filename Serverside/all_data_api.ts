
exports.all_data_api =  function (app, pool){
    var response
    get_all_data_from_database()
    setInterval(function(){
        get_all_data_from_database() 
    }, 30000)

    async function get_all_data_from_database() {
        let conn
        try{
            conn = await  pool.getConnection(); 
            response =  await conn.query("SELECT * FROM WEATHER_MEASUREMENT;")
            console.log(response)
        }catch(err){
            throw err; 
        }finally{
            if(conn) return conn.end()
        }
    }
     app.get('/all_data_api', function (req, res){
        res.send(response)
    }); 
}

