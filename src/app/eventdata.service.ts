import {Injectable, Predicate} from '@angular/core';
import {SentenceEvent} from "./article/sentence-event";


@Injectable({
  providedIn: 'root'
})
export class EventdataService {
  get highlightData(): any[] {
    console.log("getHighlightData", this._highlightData)
    return this._highlightData;
  }

  set highlightData(value: any[]) {
    console.log("setHighlightData", value)
    this._highlightData = value;
  }
  public sentenceNumber: number = 0;
  public events: SentenceEvent[] = []
  private _highlightData: any[] = [];

  constructor() {
    console.log("Service instantiated")
  }

  installObserver() {
    return !this._highlightData.length
  }

  clearData() {
    this.events = []
    this.sentenceNumber = 0;
  }
}
