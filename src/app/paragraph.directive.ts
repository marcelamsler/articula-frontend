import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Inject, OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {SentenceEvent} from './sentence-event';

@Directive({
  selector: 'p, h1, h2, h3, h4'
})
export class ParagraphDirective implements OnInit, OnDestroy {
  @HostBinding('class')
  elementClass = 'paragraph';
  private events: SentenceEvent[] = []

  constructor(private elRef: ElementRef, private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {

  }

  ngOnInit() {
    this.addSpanForEachSentence();
  }

  ngOnDestroy() {
    console.log(this.events)
  }

  private addVisibilityObserver(element: Element) {
    const observer = new IntersectionObserver((entries, opts) => this.onIntersection(entries, opts), {
      root: null,   // default is the viewport
      threshold: .9 // percentage of taregt's visible area. Triggers "onIntersection"
    })

    observer.observe(element)
  }

  private onIntersection(entries: any, opts: any) {

    entries.forEach((entry: IntersectionObserverEntry) => {
      const element = entry.target;

      const sentenceId = element.getAttribute('sentence-id') || "sentence-id not found"
      let event_type: "START_VIEW" | "END_VIEW";
      if (entry.isIntersecting) {
        event_type = "START_VIEW"
      } else {
        event_type = "END_VIEW"
      }
      debugger;
      const event = new SentenceEvent(sentenceId, element.textContent || "", "paragraph", entry.time, event_type)
      console.log("push events")
      this.events.push(event)
    })
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
      // TODO add global incremental variable
      const randomId = Math.random().toString(36).substr(2, 9);
      this.renderer.setAttribute(span, 'sentence-id', randomId);
      const text = this.renderer.createText(sentence);
      this.renderer.appendChild(span, text)
      this.renderer.appendChild(paragraph, span)
    })

    const children: HTMLCollection = this.elRef.nativeElement.children.item(0).children

    for (let i = 0; i < children.length; i++) {
      const child = children.item(i);
      //console.log(child); //second console output
      if (child) {
        this.addVisibilityObserver(child);
      }

    }
  }
}
