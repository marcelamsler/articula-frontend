import { Component, OnInit } from '@angular/core';
import {EventdataService} from "../article/eventdata.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  highlightData: any[] = [{value: "key"}];

  constructor( private eventDataService: EventdataService) {
    eventDataService.installObserver = true;
  }

  ngOnInit(): void {

  }

}
