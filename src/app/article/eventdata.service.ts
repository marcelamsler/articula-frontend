import {Injectable, Predicate} from '@angular/core';
import {SentenceEvent} from "./sentence-event";

@Injectable({
  providedIn: 'root'
})
export class EventdataService {
  public sentenceNumber: number = 0;
  public events: SentenceEvent[] = []
  public highlightData: any[] = [];

  constructor() {
  }

  installObserver() {
    return !this.highlightData.length
  }
  clearData() {
    this.events = []
    this.sentenceNumber = 0;
    this.highlightData = [];
  }
}
