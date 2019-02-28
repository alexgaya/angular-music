import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CancionesComponent } from './components/canciones/canciones.component';
import { ListsComponent } from './components/lists/lists.component';
import { FiltersComponent } from './components/filters/filters.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CancionesComponent,
    ListsComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
