import { NgModule } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

const modules: any[] = [
  MatIconModule,
  MatTooltipModule,
  MatButtonModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class AngularMaterialModule { }
