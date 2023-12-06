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
    scales: {
      y: {
        beginAtZero: true, // Y-axis starts at 0
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time',
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

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService
      .getTomorrowWeather('London') // Replace with your city
      .subscribe((response) => this.processWeatherData(response));
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
    const times: any[] = [];
    // Assuming data.list contains forecast data at 3-hour intervals
    data.list.forEach((entry: any) => {
      const date = new Date(entry.dt * 1000);
      if (date.getDate() === new Date().getDate() + 1) {
        times.push(`${date.getHours()}:00`);
        temperatures.push(entry.main.temp);
      }
    });

    this.chartData.labels = times;
    this.chartData.datasets = [
      {
        data: temperatures,
        label: 'Temperature (°C)',
        borderColor: 'blue',
        fill: false,
      },
    ];

    // Update chart if it is already initialized
    if (this.chart) {
      this.chart.update();
    }
  }
}
