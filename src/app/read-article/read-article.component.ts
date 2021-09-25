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

@Component({
  selector: 'app-read-article',
  templateUrl: './read-article.component.html',
  styleUrls: ['./read-article.component.scss']
})
export class ReadArticleComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(HTMLParagraphElement) paragraphs: QueryList<ElementRef> = new QueryList<ElementRef>();

  constructor(private eventData: EventdataService) {
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(){
    this.paragraphs.forEach((elem) => console.log(elem.nativeElement.innerHTML))
  }

  ngOnDestroy(): void {
    const read_id = UUID.UUID();
    const read = new Read(read_id, this.eventData.events)
    console.log(JSON.stringify(read))
    this.eventData.events = []
  }
}
