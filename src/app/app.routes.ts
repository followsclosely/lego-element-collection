import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CollectionByYearComponent } from './components/collection-by-year/collection-by-year.component';
import { CollectionOnGridComponent } from './components/collection-on-grid/collection-on-grid.component';

import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'collection/:id/year', component: CollectionByYearComponent },
    { path: 'collection/:id/grid', component: CollectionOnGridComponent }
  ];
  
  @NgModule({
    imports: [
      BrowserModule, 
      RouterModule, 
      RouterModule.forRoot(routes),
      FormsModule,
      MatButtonModule,
      MatSlideToggleModule],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
