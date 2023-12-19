import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas')
  chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart;
  public chartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  };
  public barChartOptions: ChartOptions = {
    responsive: true, // Makes the chart responsive to window size
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true, // Y-axis starts at 0
        title: {
          display: true,
        },
      },
      x: {
        title: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: true, // Display the legend
        position: 'top', // Position of the legend
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
    },
  };
  public chartType: ChartType = 'line';
  latitude: number | undefined;
  longitude: number | undefined;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService
      .getCurrentPosition()
      .then((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.weatherService
          .getTomorrowWeather('toronto', this.latitude, this.longitude) // Replace with your city
          .subscribe((response) => this.processWeatherData(response));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngAfterViewInit() {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: this.chartType,
      data: this.chartData,
      options: this.barChartOptions,
    });
  }

  processWeatherData(data: any) {
    const temperatures: any[] = [];
    const humidity: any[] = [];
    const times: any[] = [];
    data.timelines.hourly.forEach((entry: any) => {
      const date = new Date(entry.time);
      times.push(`${date.getHours()}:${date.getMinutes()}`);
      temperatures.push(entry.values.temperature);
      humidity.push(entry.values.humidity);
    });

    this.chartData.labels = times;
    this.chartData.datasets = [
      {
        data: temperatures,
        label: 'Temperature (°C)',
        borderColor: 'blue',
        fill: false,
      },
      {
        data: humidity,
        label: 'Humidity',
        borderColor: 'green',
        fill: false,
      },
    ];
    if (this.chart) {
      this.chart.update();

      console.log('this.chart', this.chart);
    }
  }
}
