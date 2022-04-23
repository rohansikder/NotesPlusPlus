import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage {
  constructor(private camera: Camera, private storage: Storage) { }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  };

  //Native: tried calling Camera.getPicture, but Cordova is not available. Make sure to include cordova.js or run in a device/simulator
  //Having issue - Camera issue: cordova_not_available

  // I tried reinstalling cordova and trying the app using ionic dashboard did not seem to work
  takePicture() {
    this.camera.getPicture(this.options).then(
      (imageData) => {
        this.storage.create()
          .then(() => {
            this.storage.set("photos", imageData);
            console.log("photo");
          })
          .catch();
      },
      (err) => {
        // Handle error
        console.log('Camera issue: ' + err);
      }
    );
  }
}


