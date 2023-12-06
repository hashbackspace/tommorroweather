import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast-graph',
  templateUrl: './forecast-graph.component.html',
  styleUrls: ['./forecast-graph.component.scss'],
})
export class ForecastGraphComponent {
  constructor(private weatherService: WeatherService) {}
}
