import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent, PageNotFoundComponent } from './components';

@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
