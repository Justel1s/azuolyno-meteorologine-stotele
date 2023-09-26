import { useState } from 'react';
import axios from 'axios';
import {DregmeDiv, PapildomaDiv, TemperaturosDiv, VejasDiv, Saule_logo, Lietus_logo, Dregna_logo, Vejas_logo, Naktis_logo } from './Temperaturosdivas'


function App() {
  //ORAI
  get_latest_data()
  const [weatherData, setWeatherData] = useState({"ID":0,"REMOTE_ID":0,"AMBIENT_TEMPERATURE":0,"GROUND_TEMPERATURE":0,"AIR_QUALITY":0,"AIR_PRESSURE":1400,"HUMIDITY":500,"WIND_DIRECTION":0,"WIND_SPEED":0,"WIND_GUST_SPEED":32,"RAINFALL":22.5,"CREATED":"1970-01-01T00:00:00.000Z"})
  function get_latest_data(){
    axios.get('/latest_data').then(function (response) {
      console.log(response.data[0]);
      const wData = response.data[0]
      setWeatherData(wData)
      changeLogo()
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  setInterval(function(){
    get_latest_data()
    changeLogo()
  }, 3000)




  // SPALVU KEITIMAS
  var today = new Date();
  var time = today.getHours();
    if (time >= 20)
      {
        document.body.style.background = "linear-gradient(0deg, #000000, #434343)";
      }  
    if (time >= 6 && time < 8)
      {
        document.body.style.background = "linear-gradient(0deg, #240b36, #c31432)";
      }    
    if (time >= 8 && time < 10)
      {
        document.body.style.background = "linear-gradient(0deg, #f12711, #f5af19";
      }    
    if (time >= 10 && time < 12)
      {
        document.body.style.background = "linear-gradient(0deg, #f4791f, #659999)";
      }    
    if (time >= 12 && time < 14)
      {
        document.body.style.background = "linear-gradient(0deg, #2980B9, #2980B9, #FFFFFF)";
      }    
    if (time >= 14 && time < 16)
      {
        document.body.style.background = "linear-gradient(0deg, #7F7FD5, #86A8E7, #91eae4)";
      }    
    if (time >= 16 && time < 18)
      {
        document.body.style.background = "linear-gradient(0deg, #355C7D, #6C5B7B, #c06c84";
      }    
    if (time >= 18 && time < 20)
      {
        document.body.style.background = "linear-gradient(0deg, #333333, #dd1818)";
      }    
    


    //KEISTI DIV
    const [divisionas, keistiDiva] = useState(true)
    const [divisionas2, keistiDiva2] = useState(true)

    function switchTemp(){
      keistiDiva(true)
      keistiDiva2(true)
    }
    function switchDreg(){
      keistiDiva(true)
      keistiDiva2(false)
    }
    function switchVejas(){
      keistiDiva(false)
      keistiDiva2(true)
    }
    function switchLast(){
      keistiDiva(false)
      keistiDiva2(false)
    }



    //KEISTI LOGO
    const [logo, switchlogo] = useState(0)
    
    function changeLogo(){
      if (time < 20 || time > 6)
      {
        if(weatherData.AMBIENT_TEMPERATURE>10 && time >= 6 && weatherData.WIND_SPEED < 10){
          switchlogo(0)
        }
        if(weatherData.RAINFALL>2.5){
          switchlogo(1)
        }
        if(weatherData.WIND_SPEED>15){
          switchlogo(2)
        }
      }
      if (time < 6 || time > 20)
      {
        if(weatherData.WIND_SPEED < 10){
          switchlogo(3)
        }
      }
    }
    
    
  //OVERLAY
  return (
    <div className='overlay'>
      <header className='pavadinimas-flex'>
        <h1 className='pavadinimas'>Ąžuolyno meteorologinė stotelė</h1>
      </header>
      <main>
        <div className='visi-logo'>
          {
            logo ===0 && <Saule_logo/>
          }
          {
            logo ===1 &&<Lietus_logo/>
          }
          {
            logo ===2 && <Vejas_logo/>
          }
          {
            logo === 3 && <Naktis_logo/>
          }
         </div>
        <div>
        {
          divisionas ? divisionas2? <TemperaturosDiv AMBIENT_TEMPERATURE={weatherData.AMBIENT_TEMPERATURE}/> : <DregmeDiv RAINFALL={weatherData.RAINFALL}/> : divisionas2? <VejasDiv WIND_SPEED={weatherData.WIND_SPEED} WIND_GUST_SPEED= {weatherData.WIND_GUST_SPEED}/> : <PapildomaDiv AIR_PRESSURE={weatherData.AIR_PRESSURE} HUMIDITY={weatherData.HUMIDITY} WIND_GUST_SPEED={weatherData.WIND_GUST_SPEED} />
        } 
        </div>
        
        
        <div className='mygtukai-nav'>
          <button className='temperatura-mygtukas' onClick={switchTemp}>TEMPERATŪRA</button>
          <button className='vejas-mygtukas' onClick={switchVejas}>VĖJAS</button>  
          <button className='krituliai-mygtukas' onClick={switchDreg}>KRITULIAI</button>
          <button className='papildoma-mygtukas' onClick={switchLast}>PAPILDOMA</button>
        </div>  
        
      </main>
      <footer>
        <p className='apacioje-tekstas'>D&J 2022</p>
      </footer>
    </div>
  );
}

export default App;