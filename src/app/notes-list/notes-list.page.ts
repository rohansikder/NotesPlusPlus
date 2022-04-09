import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.page.html',
  styleUrls: ['./notes-list.page.scss'],
})
export class NotesListPage implements OnInit {

  constructor(private storage: Storage) { }

  notes: { title: string, content: string, index: number }[] = [];

  ngOnInit() {
  }

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
  }
}
