import {SentenceEvent} from "./sentence-event";

export class Read {
  id: string;
  events: SentenceEvent[] = []
  private articleUrl: string;

  constructor(id: string, events: SentenceEvent[]) {
    this.id = id;
    this.articleUrl = "article1"
    this.events = events;
  }
}
