import {Injectable} from '@angular/core';
import {SentenceEvent} from "./sentence-event";

@Injectable({
  providedIn: 'root'
})
export class EventdataService {
  public sentenceNumber: number = 0;
  public installObserver: boolean = true;
  public events: SentenceEvent[] = []
  public highlightData: any[] = [];

  constructor() {
  }

  clearData() {
    this.events = []
    this.sentenceNumber = 0;
    this.highlightData = [];
  }
}
