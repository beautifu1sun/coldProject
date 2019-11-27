import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {
  AllUsers: any;
  constructor(private _http: HttpService) {}

  ngOnInit() {
    this.allUsers();
  }

  allUsers() {
    var status = this._http.getAll();
    status.subscribe(data => {
      this.AllUsers = data;
    });
  }
}