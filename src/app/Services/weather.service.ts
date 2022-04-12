import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  latitude: any = 53.350140; //latitude
  longitude: any = -6.266155; //longitude

  constructor(private httpClient: HttpClient, private geolocation: Geolocation) { }


  //GPS Options
  options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600
  };


  //Gets location
  GetCurrentCoordinates(): any {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(this.latitude, this.longitude);
      this.GetWeatherData(this.latitude, this.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }



  //Gets weather and inputs location 
  GetWeatherData(latitude, longitude): Observable<any> {
    console.log(this.latitude, this.longitude);
    console.log('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=b24d401dd0cfa83f61714c391352943a');

    return this.httpClient.get('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=b24d401dd0cfa83f61714c391352943a');
  }

}
