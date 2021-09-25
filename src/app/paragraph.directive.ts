import {AfterViewInit, Directive, ElementRef, HostBinding, Inject, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";


@Directive({
  selector: 'p, h1, h2, h3, h4'
})
export class ParagraphDirective implements OnInit {
  @HostBinding('class')
  elementClass = 'paragraph';

  constructor(private elRef: ElementRef, private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {

  }

  ngOnInit() {
    this.addSpanForEachSentence();
  }

  private addVisibilityObserver(element: Element) {
    const observer = new IntersectionObserver(onIntersection, {
      root: null,   // default is the viewport
      threshold: .5 // percentage of taregt's visible area. Triggers "onIntersection"
    })

    // callback is called on intersection change
    function onIntersection(entries: any, opts: any) {
//      console.log(entries, opts)
      entries.forEach((entry:IntersectionObserverEntry) => {
        console.log(entry)
        console.log("found element: " + entry.target.innerHTML)
      })
    }

    // Use the bserver to observe an element
    observer.observe(element)
  }

  private addSpanForEachSentence() {
    const sentences = this.elRef.nativeElement.innerHTML.split(".")

    this.elRef.nativeElement.childNodes.forEach((node: any) => {
      this.renderer.removeChild(this.elRef.nativeElement, node)
    });

    const paragraph = this.renderer.createElement('p');
    this.renderer.appendChild(this.elRef.nativeElement, paragraph)
    sentences.forEach((sentence: string) => {
      const span = this.renderer.createElement('span');
      const randomId = Math.random().toString(36).substr(2, 9);
      this.renderer.setAttribute(span, 'sentence-id', randomId);
      const text = this.renderer.createText(sentence);
      this.renderer.appendChild(span, text)
      this.renderer.appendChild(paragraph, span)
    })

    const children: HTMLCollection = this.elRef.nativeElement.children

    for (let i = 0; i < children.length; i++) {
      const child = children.item(i);
      console.log(child); //second console output
      if(child) {
        this.addVisibilityObserver(child);
      }

    }
  }
}
