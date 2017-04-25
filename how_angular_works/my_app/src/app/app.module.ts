import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { 
  AppComponent, ProductList, ProductRow, ProductImg, ProductPrice, ProductDepartment, Navbar,
  DemoForm
 } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent, ProductList, ProductRow, ProductImg, ProductPrice, ProductDepartment, Navbar,
  DemoForm],
  bootstrap: [AppComponent]
})
export class AppModule { }
