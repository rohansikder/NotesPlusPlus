import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {

  //reminder are stored in an object array
  private reminder: { title: string, content: string, index: number }[] = [];

  constructor(private storage: Storage) { }

  //Saves reminders and push to storage
  saveReminder(reminders: { title: string, content: string, index: number }) {
    this.reminder.push(reminders);

    this.storage.create()
      .then(() => {
        this.storage.set("reminders", this.reminder);
      })
      .catch();
  }
}
