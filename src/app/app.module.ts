import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReadArticleComponent} from './read-article/read-article.component';
import {AdminComponent} from './admin/admin.component';
import {ParagraphDirective} from './paragraph.directive';


@NgModule({
  declarations: [
    AppComponent,
    ReadArticleComponent,
    AdminComponent,
    ParagraphDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
