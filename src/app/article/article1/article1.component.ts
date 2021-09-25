import {
  AfterViewInit,
  Component,
  ElementRef, Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {EventdataService} from "../eventdata.service";
import {Read} from "../read";
import {UUID} from 'angular2-uuid';
import {SentenceEvent} from "../sentence-event";

@Component({
  selector: 'article1',
  templateUrl: './article1.component.html',
  styleUrls: ['./article1.component.scss']
})
export class Article1Component implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(HTMLParagraphElement) paragraphs: QueryList<ElementRef> = new QueryList<ElementRef>();

  @Input()
  public highlightData: any[] = [];

  constructor(private eventDataService: EventdataService) {

  }

  ngOnInit(): void {
    const installObserver = !this.highlightData.length;
    console.log("set install observer to: " + installObserver)
    this.eventDataService.installObserver = installObserver;
    this.eventDataService.highlightData = this.highlightData;
  }

  ngAfterViewInit() {
    this.paragraphs.forEach((elem) => console.log(elem.nativeElement.innerHTML))
  }

  ngOnDestroy(): void {
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

    const read = new Read(read_id, cleared_data)
    console.log(JSON.stringify(read))
    //read.events.forEach(value => {
    //console.log(value.sentence, value.type)
    //})
    this.eventDataService.clearData()
  }
}
