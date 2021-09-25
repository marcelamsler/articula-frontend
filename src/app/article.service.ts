import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SentenceScore} from "./admin/SentenceScore";
import {Read} from "./article/read";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseUrl = "http://192.168.43.120:5000/articula/"
  constructor(private http: HttpClient) { }

  sendRead(read: Read) {
    return this.http.post<SentenceScore>(this.baseUrl + "/api/events/", read);
  }
  getReads() {
    return this.http.get<{id: string, articleUrl: string}[]>(this.baseUrl + "api/reads/")
  }

  getSentenceScores(id: string):Observable<SentenceScore[]> {
    return this.http.get<SentenceScore[]>(this.baseUrl + "api/reads/" + id)
  }
}
