import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForecastGraphComponent } from './forecast-graph/forecast-graph.component';
import { WeatherService } from './weather.service';

@NgModule({
  declarations: [AppComponent, ForecastGraphComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgChartsModule],
  providers: [WeatherService],
  bootstrap: [AppComponent],
})
export class AppModule {}
