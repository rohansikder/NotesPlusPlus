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

  weatherMain: any[];
  weatherData: any[];
  weatherName: any[];


  latitude: number = 0; //latitude
  longitude: number = 0; //longitude
  
  constructor(private menu: MenuController, private weatherService: WeatherService, private geolocation: Geolocation) { }
  
  //GPS
  options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600
  };

  /*Get weather to reload*/
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

  /*Get weather on start up*/
  ngOnInit() {
    console.log(this.weatherMain);
    this.weatherService.GetCurrentCoordinates();
    this.weatherService.GetWeatherData(this.latitude,this.longitude).subscribe(
      (data)=>{
        this.weatherMain = data.main;
        this.weatherName = data.name;
        this.weatherData = data.weather;
        console.log(this.weatherData);
        console.log(this.weatherMain);
        console.log(this.weatherName);
      }
      );

  }

}


