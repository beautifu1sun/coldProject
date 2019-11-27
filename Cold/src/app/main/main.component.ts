import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  feed: any;
  feedExist: boolean;
  innerWidth: any;
  showSearch: boolean;
  currentRoute: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentRoute = this._route.snapshot.url;
    this.feedExist = false;
    this.feed=[];
    this.getCdcFeed();
    this.innerWidth = window.innerWidth;
    this.showSearch = false;
  }

  getCdcFeed() {
    this._httpService.getCdcFeed().subscribe(data => {
      if (data['error']) {
        console.log("Error");
      } else {
        this.feed = data['rss']['items'];
        this.feedExist=true;
      }
    });
  }

  toggleSearch() {
    if (this.showSearch) {
      this.showSearch = false;
    } else {
      this.showSearch = true;
    }
  }
}