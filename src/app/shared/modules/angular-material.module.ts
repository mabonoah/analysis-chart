import { NgModule } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

const modules: any[] = [
  MatIconModule,
  MatTooltipModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class AngularMaterialModule { }
