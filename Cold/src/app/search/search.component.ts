import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  samples: any[];
  searchBy: string;
  labs: { name: any; }[];
  labsExist: boolean;
  searchLab: any; // name
  searchActive: boolean;

  constructor(
    private _httpService: HttpService,
  ) {}

  ngOnInit() {
    this.searchActive = false;
    this.labsExist = false;
    this.samples = [];
    this.searchBy = '1'; // 1 - name | 2 - type
    this.getLabs();
  }

  getLabs() {
		this._httpService.getLabs().subscribe(data=>{
			if(!data['error']){
        this.labs = data['data'];
        if (this.labs.length>0){
          this.searchLab = this.labs[0].name;
          this.labsExist=true;
        }
			}
		})
  }

  // name, type, created_by
  // filter: location, num of results
  search($event: { target: { value: any; }; }) {
    this.searchActive = true;
    let q = $event.target.value;
    if (this.searchBy=="1") {
      if (q.length > 0) {
        this._httpService.findSampleByName(q, this.searchLab).subscribe(data => {
          this.samples = (data['data']);
        });
      } else {
        this.samples = [];
        this.searchActive = false;
      }
    } else if (this.searchBy=="2") {
      if (q.length > 0) {
        this._httpService.findSampleByType(q, this.searchLab).subscribe(data => {
          this.samples = (data['data']);
        });
      } else {
        this.samples = [];
        this.searchActive = false;
      }
    }
  }
}