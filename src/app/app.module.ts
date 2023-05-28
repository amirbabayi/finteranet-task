import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CustomersListComponent} from './component/customers-list/customers-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "./core/core.module";
import {HttpClientModule} from "@angular/common/http";
import {userReducer} from "./store/reducers";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {UserEffects} from "./store/effects";

@NgModule({
  declarations: [
    AppComponent,
    CustomersListComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({payload: userReducer}),
    EffectsModule.forRoot([UserEffects]),


  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule {
}
