import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {EventdataService} from "../eventdata.service";
import {Read} from "../read";
import { UUID } from 'angular2-uuid';
import {SentenceEvent} from "../sentence-event";

@Component({
  selector: 'app-read-article',
  templateUrl: './article1.component.html',
  styleUrls: ['./article1.component.scss']
})
export class Article1Component implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(HTMLParagraphElement) paragraphs: QueryList<ElementRef> = new QueryList<ElementRef>();

  constructor(private eventDataService: EventdataService) {
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(){
    this.paragraphs.forEach((elem) => console.log(elem.nativeElement.innerHTML))
  }

  ngOnDestroy(): void {
    const read_id = UUID.UUID();
    const sorted_event_data = this.eventDataService.events.sort((event:SentenceEvent, event2:SentenceEvent) => {
      const timeDiff =  event.time - event2.time
      if (timeDiff == 0) {
        return event.sentenceId - event2.sentenceId
      } else {
        return timeDiff
      }
    });

    const read = new Read(read_id, sorted_event_data)
    console.log(JSON.stringify(read))
    //read.events.forEach(value => {
      //console.log(value.sentence, value.type)
    //})
    this.eventDataService.clearData()
  }
}