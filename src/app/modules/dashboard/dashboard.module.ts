import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardListsComponent, DashboardChartComponent } from './components';
import { DashboardComponent, DetailsComponent } from './pages';

@NgModule({
  declarations: [
    DashboardComponent,
    DetailsComponent,
    DashboardListsComponent,
    DashboardChartComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
