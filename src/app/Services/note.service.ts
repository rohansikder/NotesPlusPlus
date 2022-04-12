import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  //notes are stored in an object array
  private notes: { title: string, content: string, index: number }[] = [];

  constructor(private storage: Storage) { }

  //Saves note and push to storage
  saveNote(note: { title: string, content: string, index: number }) {
    this.notes.push(note);

    this.storage.create()
      .then(() => {
        this.storage.set("notes", this.notes);
      })
      .catch();
  }


}
