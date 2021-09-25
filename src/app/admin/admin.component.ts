import { Component, OnInit } from '@angular/core';
import {EventdataService} from "../article/eventdata.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  highlightData: any[] = [];

  constructor( private eventDataService: EventdataService) {
    eventDataService.installObserver = true;

    this.highlightData = [{sentenceId: 0, score: 100}, {sentenceId: 3, score: 40}, {sentenceId: 19, score: 40}, {sentenceId: 39, score: 20}, {sentenceId: 40, score: 20}, {sentenceId: 41, score: 20}]
    this.highlightData = JSON.parse('[{"sentenceId": 11, "score": 0.0}, {"sentenceId": 11, "score": 0.0}, {"sentenceId": 12, "score": 0.0}, {"sentenceId": 12, "score": 0.0}, {"sentenceId": 13, "score": 0.01}, {"sentenceId": 13, "score": 0.01}, {"sentenceId": 14, "score": 0.01}, {"sentenceId": 14, "score": 0.01}, {"sentenceId": 15, "score": 0.04}, {"sentenceId": 15, "score": 0.04}, {"sentenceId": 18, "score": 0.06}, {"sentenceId": 18, "score": 0.06}, {"sentenceId": 19, "score": 0.06}, {"sentenceId": 19, "score": 0.06}, {"sentenceId": 20, "score": 0.07}, {"sentenceId": 20, "score": 0.07}, {"sentenceId": 21, "score": 0.07}, {"sentenceId": 21, "score": 0.07}, {"sentenceId": 22, "score": 0.07}, {"sentenceId": 22, "score": 0.07}, {"sentenceId": 23, "score": 0.07}, {"sentenceId": 23, "score": 0.07}, {"sentenceId": 24, "score": 0.08}, {"sentenceId": 24, "score": 0.08}, {"sentenceId": 25, "score": 0.08}, {"sentenceId": 25, "score": 0.08}, {"sentenceId": 26, "score": 0.12}, {"sentenceId": 26, "score": 0.12}, {"sentenceId": 27, "score": 0.13}, {"sentenceId": 27, "score": 0.13}, {"sentenceId": 28, "score": 0.13}, {"sentenceId": 28, "score": 0.13}, {"sentenceId": 29, "score": 0.22}, {"sentenceId": 29, "score": 0.22}, {"sentenceId": 30, "score": 0.25}, {"sentenceId": 30, "score": 0.25}, {"sentenceId": 32, "score": 0.54}, {"sentenceId": 32, "score": 0.54}, {"sentenceId": 33, "score": 0.68}, {"sentenceId": 33, "score": 0.68}, {"sentenceId": 34, "score": 0.89}, {"sentenceId": 34, "score": 0.89}, {"sentenceId": 35, "score": 0.92}, {"sentenceId": 35, "score": 0.92}, {"sentenceId": 36, "score": 1.0}, {"sentenceId": 36, "score": 1.0}]')
  }

  ngOnInit(): void {

  }

}
