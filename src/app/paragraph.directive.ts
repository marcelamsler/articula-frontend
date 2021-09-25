import {AfterViewInit, Directive, ElementRef, HostBinding, Inject, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Directive({
  selector: 'p'
})
export class ParagraphDirective implements OnInit {
  @HostBinding('class')
  elementClass = 'paragraph';

  constructor(private elRef: ElementRef, private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {

  }

  ngOnInit() {

    const sentences = this.elRef.nativeElement.innerHTML.split(".")

    this.elRef.nativeElement.childNodes.forEach((node:any) => {
      this.renderer.removeChild(this.elRef.nativeElement, node)
    });
    const paragraph = this.renderer.createElement('p');
    this.renderer.appendChild(this.elRef.nativeElement, paragraph )
    sentences.forEach((sentence:string) => {
      const span = this.renderer.createElement('span');
      const text = this.renderer.createText(sentence);
      this.renderer.appendChild(span, text)
      this.renderer.appendChild(paragraph, span)
    })

  }

}
