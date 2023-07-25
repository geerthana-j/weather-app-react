package com.assessment.weatherInfo;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
//import com.assessment.weatherInfo.WeatherInfoService;

@RestController
@RequestMapping("/api/v1")
public class WeatherInfoController {

	@Autowired	
	private WeatherInfoService weatherInfoService;
	@GetMapping("/weather")
	public ResponseEntity<String> getWeatherInfo(@RequestParam String city) {
		System.out.println(city);
		JSONObject weatherInfo = weatherInfoService.getWeatherInfo(city);
		// weatherInfo.keySet().forEach(keyStr ->
		// {
		// 	Object keyvalue = weatherInfo.get(keyStr);
		// 	System.out.println("key: "+ keyStr + " value: " + keyvalue);
	
		// 	//for nested objects iteration if required
		// 	//if (keyvalue instanceof JSONObject)
		// 	//    printJsonObject((JSONObject)keyvalue);
		// });
		if(weatherInfo!=null){
	//	System.out.println(weatherInfo.getInt("cod"));
	//	if (weatherInfo.getInt("cod") == 200) {
	//	if()
			System.out.println("Hello -------------------- Java"+weatherInfo.toString());
			
			return new ResponseEntity<>(weatherInfo.toString(), HttpStatus.OK);
		} else {
			String jsonNotFoundString = "{\"cod\": 404, \"message\":\"WeatherData is not found for this city\"}";

			return new ResponseEntity<>(jsonNotFoundString,HttpStatus.NOT_FOUND);
		}
	}
	
}