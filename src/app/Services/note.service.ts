import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Note } from 'src/models/note.module';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notes: {title: string, content: string}[] = [];

  constructor(private storage:Storage) { }

  saveNote(note: {title: string, content: string}){
  this.notes.push(note);
  }

  getAllNotes(){
    return [...this.notes];
  }
}
