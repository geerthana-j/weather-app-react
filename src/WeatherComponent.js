import React, { useState, useEffect } from 'react';
import './WeatherComponent.css';
const WeatherComponent = () => {
  const [weather, setWeather] = useState(null);
  const [countries,setCountries] = useState(null);
  const[states,setStates]=useState(null);
  const [cities,setCities] = useState(null);
  const [weatherNF, setWeatherNF]=useState(null);
  const [authToken,setAuthToken] = useState(null);
  const kelvinToCelcius=273.15;
  const hpaToHg=0.02952998057228486;
    useEffect(() => {
      if(authToken==null){
      getAccessToken();
      }
      else{
          fetchCountry();        
      }}
      ,[authToken]);
      
    function getAccessToken() {
      fetch('https://www.universal-tutorial.com/api/getaccesstoken', {
        headers: {
          "Accept": "application/json",
          "api-token": "pB_HTHPCY7vZ_wdZxJ0CH3vgm33V5P-hupK6jBe9cjA7mbv-u-nsWUabgiMUoNxRiEQ",
          "user-email": "vembukarthick@gmail.com"
      }
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
         setAuthToken(data.auth_token);
      //   fetchCountry();
      })
      .catch((error) => console.error('Error fetching access token:', error));
    }
    async function fetchCountry(){
      fetch('https://www.universal-tutorial.com/api/countries', {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Accept": "application/json"
      }
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data.hasOwnProperty('error')){ 
          console.log(data.error);
        }
        else{
          setCountries(data);
          console.log(data);
        }
      })
      .catch((error) => console.error('Error fetching access token:', error));
    }
   function handleCountryChange(event){
    const country = event.target.value;
    console.log(country);
    setStates(null);
      setCities(null);
      setWeather(null);
    if(country.length>0){
        fetch(`https://www.universal-tutorial.com/api/states/${country}`, {
            headers: {
              "Authorization": `Bearer ${authToken}`, 
              "Accept": "application/json"
          }
          })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
              setStates(data);
            //console.log(data);
            //Store the access token in a state if needed
        })
        .catch((error) => console.error('Error fetching the states ', error));
    }
  }
  function handleStateChange(event){
        const state = event.target.value;
        setCities(null);
        setWeather(null);
      if(state.length>0){
        fetch(`https://www.universal-tutorial.com/api/cities/${state}`, {
            headers: {
              "Authorization": `Bearer ${authToken}`,
              "Accept": "application/json"
          }
            
          })
          .then((response) => response.json())
          .then((data) => {
            setCities(data);
          })
          .catch((error) => console.error('Error fetching access token:', error));
        }
        console.log(event.target.value);
  }
  function handleCityChange(event){
        const city = event.target.value;
        console.log(typeof city);
        setWeather(null);
        if(city.length>0){
        fetch(`http://weatherapplication-env.eba-g8hai8ef.eu-north-1.elasticbeanstalk.com/api/v1/weather?city=${city}`)
        .then((response) => response.json())
        .then((data) => {
          if(data.cod===200){
            
            setWeather(data);
            setWeatherNF(null);
          }
          else{
            setWeather(null);
            setWeatherNF(data);
          }
        })
        .catch((error) =>{ 
          setWeather(null);
          console.error('Error fetching weather data:', error)});
      }

    }

  return (
    <div className="body">
      <div className="place">
    <div className="country" >
        <div> Country</div>
            {countries ? (
                 <div>  
            <select className = "opt"   onChange={handleCountryChange}>
                <option value="" default></option>
            {countries.map((country) => (
              <option key={country.country_short_name} value={country.country_name}>
                {country.country_name}
              </option>
            ))}
            </select>
          {/* <p>Temperature: {weather.main.temp}</p>
          <p>Humidity: {weather.main.humidity}</p> */}
        </div>
      ) : (
        <select className = "opt"  >
        <option value="" default></option>
        </select>
       // <p>Loading...</p>
      )}
    </div>
    <div className="state" >
    <div> State </div>
    {states ? (
                 <div>  
            <select className = "opt" onChange={handleStateChange}>
            <option value="" default></option>

            {states.map((state,index) => (
              <option key={index} value={state.state_name}>
                {state.state_name}
              </option>
            ))}
            </select>
          {/* <p>Temperature: {weather.main.temp}</p>
          <p>Humidity: {weather.main.humidity}</p> */}
        </div>
      ) : (
        <select className = "opt"  >
        <option value="" default></option>
        </select>
     //   <p>Loading...</p>
      )}
    </div>
    <div className="city">
    <div> City </div>
    {cities ? (
                 <div>  
            <select className = "opt"   onChange={handleCityChange}>
            <option value="" default></option>

            {cities.map((city,index) => (
              <option key={index} value={city.city_name}>
                {city.city_name}
              </option>
            ))}
            </select>
          {/* <p>Temperature: {weather.main.temp}</p>
          <p>Humidity: {weather.main.humidity}</p> */}
        </div>
      ) : (
        <select  className = "opt" >
        <option value="" default></option>
        </select>
       // <p>Loading...</p>
      )}
    </div>
    </div>
    <div className="weather">
    {weather ? (
        <div>
          <div id="tit"> Weather Report: {weather.name}</div>
            <div id="icon"><img id="wicon" src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather icon"/></div> 
            <p> Weather : {weather.weather[0].main} </p>
            <p>Temperature: {(weather.main.temp - kelvinToCelcius).toFixed(2)} ℃</p>
            <p>Pressure: {(weather.main.pressure *  hpaToHg).toFixed(2)} Hg</p>
           
            <p>Humidity: {weather.main.humidity} %</p>
        </div>
    ) : (
        weatherNF ? (<p>{weatherNF.message}</p>) : (<p>Please select a city for getting the weather data .!.!.!.</p>)
      )}
 
    </div>
    </div>
  );
 
};

export default WeatherComponent;
