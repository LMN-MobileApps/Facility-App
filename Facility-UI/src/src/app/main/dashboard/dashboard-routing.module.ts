import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLoader } from 'src/app/loader/loader.component';
import { StatusPage } from '../status/status.page';

import { DashboardPage } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    // pathMatch: 'full',
    component: DashboardPage
  },
  {
    path: 'status',
    // pathMatch: 'full',
    component: StatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, AppLoader],
  declarations: [AppLoader]
})
export class DashboardPageRoutingModule {}
