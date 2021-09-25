import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Article1Component} from "./article1/article1.component";
import {ParagraphDirective} from "./paragraph.directive";
import {EventdataService} from "./eventdata.service";

@NgModule({
  declarations: [Article1Component, ParagraphDirective],
  imports: [
    CommonModule
  ],
  providers: [EventdataService],
  exports: [Article1Component]
})
export class ArticleModule { }
