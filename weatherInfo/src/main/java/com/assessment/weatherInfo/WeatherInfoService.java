package com.assessment.weatherInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
@Service
public class WeatherInfoService {
    @Value("${openweathermap.api.key}")
	private String apiKey;
    @Autowired
	private RestTemplate restTemplate;
    public JSONObject getWeatherInfo(String city) {
		JSONObject geocodingJson ;
		String geocodingUrl = String.format("https://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s", city, apiKey);
		try{
		ResponseEntity<String> geocodingResponse = restTemplate.getForEntity(geocodingUrl, String.class);
		System.out.println(geocodingResponse);
		geocodingJson = new JSONObject(geocodingResponse.getBody());
		}
		catch(Exception e){
			return null;
		}
		return geocodingJson;

	}
	
}
