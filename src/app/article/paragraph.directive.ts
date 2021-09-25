import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Renderer2
} from '@angular/core';

import {SentenceEvent} from './sentence-event';
import {EventdataService} from "./eventdata.service";

@Directive({
  selector: 'p, h1, h2, h3, h4'
})
export class ParagraphDirective implements AfterViewInit {
  @HostBinding('class')
  elementClass = 'paragraph';
  private firstStartEventReceived: boolean = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2, private eventDataService: EventdataService) {

  }

  ngAfterViewInit(): void {
    console.log(this.eventDataService.highlightData)
    this.addSpanForEachSentence(this.eventDataService.highlightData);
    if (this.eventDataService.installObserver) {
      this.addObserverForAllCreatedSpans()
    }
  }


  private addSpanForEachSentence(highlightData: any[]) {
    const sentences = this.elRef.nativeElement.innerHTML.split(".")

    this.elRef.nativeElement.childNodes.forEach((node: any) => {
      this.renderer.removeChild(this.elRef.nativeElement, node)
    });

    const paragraph = this.renderer.createElement('p');
    this.renderer.appendChild(this.elRef.nativeElement, paragraph)
    sentences.forEach((sentence: string) => {
      const span = this.renderer.createElement('span');

      const sentenceId = this.eventDataService.sentenceNumber++;
      this.renderer.setAttribute(span, 'sentence-id', sentenceId.toString());

      const sentenceToHighglight = highlightData.find(highlightedSentence => {
        return highlightedSentence.sentenceId == sentenceId;
      })

      if (sentenceToHighglight) {
        console.log("setting style")
        this.renderer.setStyle(span, "background-color", this.heatMapColorforValue(sentenceToHighglight.score))
      }
      const text = this.renderer.createText(sentence);
      this.renderer.appendChild(span, text)
      this.renderer.appendChild(paragraph, span)
    })

  }

  private addObserverForAllCreatedSpans() {
    const children: HTMLCollection = this.elRef.nativeElement.children.item(0).children

    for (let i = 0; i < children.length; i++) {
      const child = children.item(i);
      if (child) {
        this.addVisibilityObserver(child);
      }
    }
  }

  private addVisibilityObserver(element: Element) {
    const observer = new IntersectionObserver((entries, opts) => this.onIntersection(entries, opts), {
      root: null,   // default is the viewport
      threshold: .5 // percentage of targets visible area. Triggers "onIntersection"
    })

    observer.observe(element)
  }

  private onIntersection(entries: any, opts: any) {

    entries.forEach((entry: IntersectionObserverEntry) => {
      const element = entry.target;
      const sentenceId = parseInt(element.getAttribute('sentence-id') || "9999999")
      let eventType: "START_VIEW" | "END_VIEW";
      if (entry.isIntersecting) {
        eventType = "START_VIEW"
        this.firstStartEventReceived = true
      } else {
        eventType = "END_VIEW"
      }
      if (this.firstStartEventReceived) {
        console.log(eventType)
        const event = new SentenceEvent(sentenceId, element.textContent || "", "paragraph", entry.time, eventType)
        this.eventDataService.events.push(event)
      }

    })
  }


  private heatMapColorforValue(value: number) {
    //const h = (1.0 - value / 100.0) * 240
    //return "hsl(" + h + ", 100%, 50%, 0.1)";
    return "rgb(0 255 19 / "+ value + "%)"
  }
}
