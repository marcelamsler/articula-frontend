import {SentenceEvent} from "./sentence-event";

export class Read {
  id: string;
  events: SentenceEvent[] = []

  constructor(id: string, events: SentenceEvent[]) {
    this.id = id;
    this.events = events;
  }
}
