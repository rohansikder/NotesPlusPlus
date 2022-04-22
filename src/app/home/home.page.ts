import { Component } from '@angular/core';
import { WeatherService } from '../Services/weather.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //Initialize variables

  //Initialized  weatherMain object as i was having a displaying output issue
  weatherMain = {
    "temp": 0,
    "feels_like": 0,
    "temp_min": 0,
    "temp_max": 0,
    "pressure": 0,
    "humidity": 0,
    "sea_level": 0,
    "grnd_level": 0
  };

  weatherData: any[];
  weatherName: any[];

  latitude: number = 53.350140; //latitude
  longitude: number = -6.266155; //longitude

  notes: { title: string, content: string, index: number }[] = [];
  reminders: { title: string, content: string, index: number }[] = [];

  noteCount: number;
  reminderCount: number;
  

  constructor(public navCtrl: NavController, private weatherService: WeatherService, private geolocation: Geolocation, private storage: Storage, public alertController: AlertController) { }


  //GPS Options
  options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600
  };

  /*Get weather to reload*/
  GetCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.weatherService.GetWeatherData(this.latitude, this.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    console.log(this.weatherMain);
    this.weatherService.GetCurrentCoordinates();
    this.weatherService.GetWeatherData(this.latitude, this.longitude).subscribe(
      (data) => {
        this.weatherMain = data.main;
        this.weatherName = data.name;
        this.weatherData = data.weather;
        console.log(this.weatherData);
        console.log(this.weatherMain);
        console.log(this.weatherName);
      }
    );

  }

  /*Get weather on start up*/
  ngOnInit() {

    this.noteCount = Object.keys(this.notes).length;
    this.reminderCount = Object.keys(this.reminders).length;

    console.log(this.weatherMain);
    this.weatherService.GetCurrentCoordinates();
    this.weatherService.GetWeatherData(this.latitude, this.longitude).subscribe(
      (data) => {
        this.weatherMain = data.main;
        this.weatherName = data.name;
        this.weatherData = data.weather;
        console.log(this.weatherData);
        console.log(this.weatherMain);
        console.log(this.weatherName);
      }
    );

  }//End Of Ngoninit


  //Gets all data from storage
  ionViewWillEnter() {

    this.storage.create()
      .then(() => {
        this.storage.get('notes')
          .then((data) => {
            this.notes = data;
          })
          .catch();
      })
      .catch();

      this.storage.create()
      .then(() => {
        this.storage.get('reminders')
          .then((data) => {
            this.reminders = data;
          })
          .catch();
      })
      .catch();

      //Gets count of how many notes there is
      this.noteCount = Object.keys(this.notes).length;
      this.reminderCount = Object.keys(this.reminders).length;

  }

  //Reset app function with confirm menu
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure you want to reset?',
      message: 'You will lose your data forever!!!',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancelled Do nothing');
          }
        }, {
          text: 'Yes',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            //Reset app and reloads app
            this.storage.clear();
            window.location.reload();
          }
        }
      ]
    });
    await alert.present();
  }

  //Gets current date
  today : number = Date.now();
}


