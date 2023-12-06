import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'YOUR_API_KEY'; // Replace with your API key
  private apiUrl = 'https://api.openweathermap.org/data/2.5/forecast'; // Example for OpenWeatherMap API

  constructor(private http: HttpClient) {}

  getTomorrowWeather(city: string) {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }
}
