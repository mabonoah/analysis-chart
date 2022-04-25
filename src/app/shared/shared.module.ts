import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './modules/angular-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    TranslateModule,
    NgChartsModule
  ]
})
export class SharedModule { }
