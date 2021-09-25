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

    this.highlightData = [{sentenceId: 0, score: 100}, {sentenceId: 3, score: 40}, {sentenceId: 19, score: 20} ]
  }

  ngOnInit(): void {

  }

}
