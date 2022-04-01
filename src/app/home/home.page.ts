import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { WeatherService } from '../Services/weather.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weatherData: any[];
  weatherMain: number[];
  weatherName: any[];

  constructor(private menu: MenuController, private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.GetWeatherData().subscribe(
      (data)=>{
        this.weatherData = data.weather;
        this.weatherMain = data.main;
        this.weatherName = data.name;
        console.log(this.weatherData);
        console.log(this.weatherMain);
        console.log(this.weatherName);
      }
      );
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

}
