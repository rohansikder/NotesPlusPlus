import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemindersListPageRoutingModule } from './reminders-list-routing.module';

import { RemindersListPage } from './reminders-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemindersListPageRoutingModule
  ],
  declarations: [RemindersListPage]
})
export class RemindersListPageModule {}
