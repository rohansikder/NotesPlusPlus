import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemindersListPage } from './reminders-list.page';

const routes: Routes = [
  {
    path: '',
    component: RemindersListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemindersListPageRoutingModule {}
