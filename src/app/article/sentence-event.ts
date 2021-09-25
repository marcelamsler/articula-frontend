export class SentenceEvent {

  sentenceId: number;
  sentence: string;
  format: string;
  time: number;
  type: 'START_VIEW' | 'END_VIEW'

  constructor(sentenceId: number, sentence: string, format: string, time: number, type: "START_VIEW" | "END_VIEW") {
    this.sentenceId = sentenceId;
    this.sentence = sentence;
    this.format = format;
    this.time = time;
    this.type = type;
  }
}
