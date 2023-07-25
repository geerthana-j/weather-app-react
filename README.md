# WeatherInfo Application


## This project is created using
- React.js
- Spring Boot
- AWS Elastic Bean Stack
- AWS Amplify

### `Features`
- User can select a city from a dropdown according to the state and country.
   - Three dropdown options will be there for choosing Country, State and City
- The current weather data of the selected city will be displayed

## Backend
- The backend of this application is hosted on AWS Bean Stack.
- The URL is http://weatherapplication-env.eba-g8hai8ef.eu-north-1.elasticbeanstalk.com/api/v1/weather?city={city_name}
  - OpenWeather API has been used to fetch weather data of a city
- This URL can be used to test the API.

## Frontend
- The Frontend of this application is hosted on AWS Amplify
- The URL to this application is https://master.d24lz07z22nyev.amplifyapp.com/
  - An API hs been used to fetch the country, state and city.

## `Result`

This is the final Result of the application.

-when a city is not selected
![nocities](https://github.com/geerthana-j/weather-app-react/blob/main/nocities.jpg)

-when a city is selected
![WeatherInfoApp](https://github.com/geerthana-j/weather-app-react/blob/main/weatherInfoApp.jpg)

-when a city is selected but weather data not found for it
![noweatherdata](https://github.com/geerthana-j/weather-app-react/blob/main/noweatherdata.jpg)



