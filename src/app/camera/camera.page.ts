import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage {
  constructor(private camera: Camera,private storage: Storage) {}

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

      this.camera.getPicture(options).then(
        (imageData) => {
          this.storage.create()
        .then(() => {
          this.storage.set("photos", imageData);
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


