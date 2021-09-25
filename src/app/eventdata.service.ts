import {Injectable} from '@angular/core';
import {SentenceEvent} from "./sentence-event";

@Injectable({
  providedIn: 'root'
})
export class EventdataService {
  public sentenceNumber: number = 0;

  public events: SentenceEvent[] = []

  constructor() {
  }
}
