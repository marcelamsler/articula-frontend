import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Renderer2
} from '@angular/core';

import {SentenceEvent} from './sentence-event';

import {EventdataService} from "../eventdata.service";


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
    setTimeout(() => {
      this.addSpanForEachSentence(this.eventDataService.highlightData);
      if (this.eventDataService.isReadingMode()) {
        this.addObserverForAllCreatedSpans()
      }
    })

  }

  private addSpanForEachSentence(highlightData: any[]) {
    const sentences = this.elRef.nativeElement.innerHTML.split(".")

    this.elRef.nativeElement.childNodes.forEach((node: any) => {
      this.renderer.removeChild(this.elRef.nativeElement, node)
    });

    const paragraph = this.renderer.createElement('p');
    this.renderer.appendChild(this.elRef.nativeElement, paragraph)
    this.eventDataService.totalSentenceCount += sentences.length
    sentences.forEach((sentence: string, index:number) => {
      const span = this.renderer.createElement('span');

      const sentenceId = this.eventDataService.sentenceNumber++;
      this.renderer.setAttribute(span, 'sentence-id', sentenceId.toString());

      if (!this.eventDataService.isReadingMode()) {
        this.addHighlighting(highlightData, sentenceId, span);
      }

      let text;
      if (index == sentences.length -1) {
        text = this.renderer.createText(sentence);
      } else {
        text = this.renderer.createText(sentence + ".");
      }

      this.renderer.appendChild(span, text)
      this.renderer.appendChild(paragraph, span)
    })

  }

  private addHighlighting(highlightData: any[], sentenceId: number, span: any) {
    const sentenceToHighglight = highlightData.find(highlightedSentence => {
      return highlightedSentence.sentenceId == sentenceId;
    })

    if (sentenceToHighglight) {
      let score;
      sentenceToHighglight.score = sentenceToHighglight.score * 100;
      if (sentenceToHighglight) {
        if (this.elRef.nativeElement.nodeName == "H1") {
          score = Math.min(sentenceToHighglight.score * 3, 100)
          console.log("upscaled score from ", sentenceToHighglight.score, " to ", score)
        } else if (this.elRef.nativeElement.nodeName == "H2") {
          score = Math.min(sentenceToHighglight.score * 2, 100)
          console.log("upscaled score from ", sentenceToHighglight.score, " to ", score)
        } else if (this.elRef.nativeElement.nodeName == "H3") {
          score = Math.min(sentenceToHighglight.score * 1.5, 100)
          console.log("upscaled score from ", sentenceToHighglight.score, " to ", score)
        } else {
          score = sentenceToHighglight.score;
        }

        this.renderer.setStyle(span, "background-image", this.heatMapColorforValue(score))
        this.renderer.setStyle(span, "padding", "10px")
        this.renderer.setStyle(span, "margin", "-10px")
        this.renderer.setStyle(span, "border-radius", "40px")
      }
    }
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
      rootMargin: "0px 0px -30% 0px",
      threshold: .9 // percentage of targets visible area. Triggers "onIntersection"
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
        const event = new SentenceEvent(sentenceId, element.textContent || "", "paragraph", entry.time, eventType)
        this.eventDataService.events.push(event)
      }

    })
  }


  private heatMapColorforValue(value: number) {
    //const h = (1.0 - value / 100.0) * 240
    //return "hsl(" + h + ", 100%, 50%, 0.1)";
    return "radial-gradient(rgb(0 255 19 / " + value + "%), rgb(0 255 19 / " + value / 10 + "%))";
    // return "rgb(0 255 19 / "+ value + "%)"
  }
}
