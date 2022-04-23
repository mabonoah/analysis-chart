import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent, DetailsComponent } from './pages';

@NgModule({
  declarations: [
    DashboardComponent,
    DetailsComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
