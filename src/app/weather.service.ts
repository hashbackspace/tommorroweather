import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as QueryString from 'qs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  apiKey = 'NGZCmWiCKfm5QpVH2m99UUh06R8NtP7e'; // Replace with your API key
  private apiUrl = 'https://api.tomorrow.io/v4/weather/forecast'; // Example for tomorrow.io API

  // choose the unit system, either metric or imperial
  units = 'imperial';

  // set the timesteps, like "1m", "1h" and/or "1d"
  timesteps = ['1h'];

  constructor(private http: HttpClient) {}

  getTomorrowWeather(city: string, lat: number, long: number) {
    const weatherForecastParams = {
      apikey: this.apiKey,
      location: 'toronto',
      units: this.units,
      timesteps: this.timesteps,
    };

    const url = `${this.apiUrl}?location=${'toronto'}&apikey=${
      this.apiKey
    }&units=${this.units}&timesteps=${this.timesteps}`;
    return this.http.get(url);
  }

  getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by your browser');
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    });
  }
}
