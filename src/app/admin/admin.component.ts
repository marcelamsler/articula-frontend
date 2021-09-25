import {Component, OnInit} from '@angular/core';
import {EventdataService} from "../article/eventdata.service";
import {ArticleService} from "../article.service";
import {SentenceScore} from "./SentenceScore";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  highlightData: SentenceScore[] = [];
  reads: any[] = []

  constructor(private eventDataService: EventdataService, private articleService: ArticleService) {

    // this.highlightData = [{sentenceId: 0, score: 100}, {sentenceId: 3, score: 40}, {
    //   sentenceId: 19,
    //   score: 40
    // }, {sentenceId: 39, score: 20}, {sentenceId: 40, score: 20}, {sentenceId: 41, score: 20}]
    // this.highlightData = JSON.parse('[{"sentenceId": 0, "score": 0.0}, {"sentenceId": 1, "score": 0.23}, {"sentenceId": 2, "score": 0.34}, {"sentenceId": 3, "score": 0.37}, {"sentenceId": 5, "score": 0.42}, {"sentenceId": 6, "score": 0.42}, {"sentenceId": 7, "score": 0.42}, {"sentenceId": 8, "score": 0.3}, {"sentenceId": 9, "score": 0.3}, {"sentenceId": 11, "score": 0.73}, {"sentenceId": 12, "score": 0.73}, {"sentenceId": 13, "score": 0.73}, {"sentenceId": 14, "score": 0.73}, {"sentenceId": 15, "score": 0.73}, {"sentenceId": 18, "score": 0.94}, {"sentenceId": 19, "score": 0.94}, {"sentenceId": 20, "score": 0.94}, {"sentenceId": 21, "score": 0.94}, {"sentenceId": 22, "score": 0.94}, {"sentenceId": 23, "score": 0.95}, {"sentenceId": 24, "score": 0.95}, {"sentenceId": 25, "score": 0.95}, {"sentenceId": 26, "score": 0.95}, {"sentenceId": 27, "score": 0.95}, {"sentenceId": 28, "score": 0.95}, {"sentenceId": 29, "score": 0.95}, {"sentenceId": 31, "score": 0.95}, {"sentenceId": 32, "score": 0.95}, {"sentenceId": 33, "score": 0.97}, {"sentenceId": 34, "score": 1.0}, {"sentenceId": 36, "score": 1.0}, {"sentenceId": 37, "score": 1.0}, {"sentenceId": 38, "score": 1.0}, {"sentenceId": 39, "score": 1.0}]')
  }

  ngOnInit(): void {
    this.articleService.getReads().subscribe((data) => {
      console.log(data)
      this.reads = data;
    })
  }

  openRead(id: string) {
    this.articleService.getSentenceScores(id).subscribe((data) => {
      console.log("setting highlight data to", data)
      this.eventDataService.highlightData = data;
    })
  }
}
