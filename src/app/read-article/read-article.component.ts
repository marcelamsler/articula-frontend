import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';
import {EventdataService} from "../eventdata.service";

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
    console.log(JSON.stringify(this.eventData.events))
  }
}
