import {
  AfterViewInit,
  Component,
  ElementRef, Inject, OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';

import {Read} from "../read";
import {UUID} from 'angular2-uuid';
import {SentenceEvent} from "../sentence-event";
import {ArticleService} from "../../article.service";
import {EventdataService} from "../../eventdata.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'article1',
  templateUrl: './article1.component.html',
  styleUrls: ['./article1.component.scss']
})
export class Article1Component implements OnInit, AfterViewInit {
  @ViewChildren(HTMLParagraphElement) paragraphs: QueryList<ElementRef> = new QueryList<ElementRef>();

  private startTime: number = 0;

  constructor(@Inject(DOCUMENT) private document: Document, private eventDataService: EventdataService, private articleService: ArticleService) {

  }

  ngOnInit(): void {
    console.log("reading mode is: " + this.eventDataService.isReadingMode())
    this.eventDataService.clearData()
  }

  ngAfterViewInit() {
    this.startTime = new Date().getTime();
  }

  sendRequest(): void {
    console.log("is reading mode? ", this.eventDataService.isReadingMode())
    if (this.eventDataService.isReadingMode()) {
      const endTime = new Date().getTime();
      const totalTimeMillis = endTime - this.startTime;
      const read_id = UUID.UUID();
      const sorted_event_data = this.eventDataService.events.sort((event: SentenceEvent, event2: SentenceEvent) => {
        const timeDiff = event.time - event2.time
        if (timeDiff == 0) {
          return event.sentenceId - event2.sentenceId
        } else {
          return timeDiff
        }
      });

      const cleared_data = sorted_event_data.filter(event => {
        return event.sentence != "&nbsp;" && event.sentence
      })

      const read = new Read(read_id, cleared_data, totalTimeMillis, this.eventDataService.totalSentenceCount)

      this.articleService.sendRead(read).subscribe(() => {
        console.log("data-sent")
        this.eventDataService.clearData()
        this.document.location.href = 'https://srf.ch'
      });
    }
  }
}
