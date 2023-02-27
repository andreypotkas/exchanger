import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    HttpClientModule,
  ],
  exports:[
    PrimengModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class SharedModule { }
