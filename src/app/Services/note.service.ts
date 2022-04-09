import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notes: { title: string, content: string, index: number }[] = [];

  constructor(private storage: Storage) { }


  saveNote(note: { title: string, content: string, index: number }) {
    this.notes.push(note);

    this.storage.create()
      .then(() => {
        this.storage.set("notes", this.notes);
      })
      .catch();
  }


}
