import {AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-read-article',
  templateUrl: './read-article.component.html',
  styleUrls: ['./read-article.component.scss']
})
export class ReadArticleComponent implements OnInit, AfterViewInit {
  @ViewChildren(HTMLParagraphElement) paragraphs: QueryList<ElementRef> = new QueryList<ElementRef>();

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(){
    this.paragraphs.forEach((elem) => console.log(elem.nativeElement.innerHTML))
  }
}
