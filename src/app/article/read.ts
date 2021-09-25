import {SentenceEvent} from "./sentence-event";

export class Read {
  id: string;
  events: SentenceEvent[] = []
  private articleUrl: string;
  private totalTimeMillis: number;
  private totalSentenceCount: number;

  constructor(id: string, events: SentenceEvent[], totalTimeMillis: number, totalSentenceCount: number) {
    this.id = id;
    this.totalTimeMillis = totalTimeMillis;
    this.articleUrl = "Artikel - Preiskampf Schnelltests"
    this.events = events;
    this.totalSentenceCount = totalSentenceCount;
  }
}
