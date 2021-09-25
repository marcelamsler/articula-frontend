import {SentenceEvent} from "./sentence-event";

export class Read {
  id: string;
  events: SentenceEvent[] = []
  private articleId: number;

  constructor(id: string, events: SentenceEvent[]) {
    this.id = id;
    this.articleId = 1
    this.events = events;
  }
}
