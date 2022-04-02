import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { WeatherService } from '../Services/weather.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weatherData: any[];
  weatherMain: number[];
  weatherName: any[];

  latitude: number = 0; //latitude
  longitude: number = 0; //longitude
  

  constructor(private menu: MenuController, private weatherService: WeatherService, private geolocation: Geolocation) { }


  options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600
  };

  GetCurrentCoordinates(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.weatherService.GetWeatherData(this.latitude,this.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.ngOnInit();
  }

  ngOnInit() {
    this.weatherService.GetCurrentCoordinates();
    this.weatherService.GetWeatherData(this.latitude,this.longitude).subscribe(
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


