import { Component, OnInit } from '@angular/core';
import { Note } from 'src/models/note.module';
import { NoteService } from '../Services/note.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage {

  constructor(private noteService: NoteService) { 

  }

  saveNote(value: { title: string , content: string}){
    this.noteService.saveNote(value);
    console.log("SAVED NOTE" + value);
  }

}
