import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.page.html',
  styleUrls: ['./reminders-list.page.scss'],
})
export class RemindersListPage{

  constructor(private storage: Storage, public alertController: AlertController, private toastController: ToastController) { }

  reminders: { title: string, content: string, index: number }[] = [];

  reminderCount: number;

  reminderNumber: number;

  ionViewWillEnter() {
    this.storage.create()
      .then(() => {
        this.storage.get('reminders')
          .then((data) => {
            this.reminders = data;
          })
          .catch();
      })
      .catch();

    this.reminderCount = Object.keys(this.reminders).length;
  }


  async presentAlertConfirm() {
    this.reminderCount = Object.keys(this.reminders).length;


    if (this.reminderNumber < this.reminderCount && this.reminderCount > -1) {

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Are you sure you want to delete your reminder',
        message: 'You will lose your note forever!!!',
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
              console.log('Confirm Okay' + this.reminderNumber);

              this.reminders.splice(this.reminderNumber, 1);

              this.storage.create()
                .then(() => {
                  this.storage.set("reminders", this.reminders);
                })
                .catch();
            }
          }
        ]
      });
      await alert.present();

    } else {
      const toast = await this.toastController.create({
        color: 'dark',
        message: 'Please enter a valid reminder Number.',
        duration: 2000
      });
      toast.present();
    }


  }

}
