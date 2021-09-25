import {Injectable, Predicate} from '@angular/core';
import {SentenceEvent} from "./article/sentence-event";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class EventdataService {
  get highlightData(): any[] {
    return this._highlightData;
  }

  set highlightData(value: any[]) {
    this._highlightData = value;
  }
  public sentenceNumber: number = 0;
  public events: SentenceEvent[] = []
  private _highlightData: any[] = [];

  constructor(private router: Router) {
  }

  isReadingMode() {
    return !this.router.url.includes("admin")
  }

  clearData() {
    this.events = []
    this.sentenceNumber = 0;
  }
}
