import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminComponent} from './admin/admin.component';
import {ArticleModule} from "./article/article.module";
import {HttpClientModule} from "@angular/common/http";
import { RerenderDirective } from './rerender.directive';
import {EventdataService} from "./eventdata.service";


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    RerenderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ArticleModule,
    HttpClientModule
  ],
  providers: [EventdataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
