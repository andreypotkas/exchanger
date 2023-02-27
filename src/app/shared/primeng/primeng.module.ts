import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import {InputTextModule} from 'primeng/inputtext';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    ChartModule,
    TableModule,
    MultiSelectModule,
    InputTextModule
  ]
})
export class PrimengModule { }
