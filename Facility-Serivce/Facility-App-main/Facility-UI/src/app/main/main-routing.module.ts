import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MainPage,
	  children:
		  [
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
			  },
			  {
				path: 'create-ticket',
				loadChildren: () => import('./create-ticket/create-ticket.module').then( m => m.CreateTicketPageModule)
			  },
			  {
				path: 'status',
				loadChildren: () => import('./status/status.module').then( m => m.StatusPageModule)
			  },
			  {
				path: 'settings',
				loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
			  },
			
	  ]
  },
  {
	path: '',
	redirectTo: '/main/tabs/dashboard',
	pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
