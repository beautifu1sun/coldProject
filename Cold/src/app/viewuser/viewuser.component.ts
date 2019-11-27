import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {
  id: any;
  user: any;

  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.user = { firstname: '', lastname: '', email: '', username: '' };
    this.getUser(this.id);
  }

  getUser(id: any) {
    var status = this._http.getUser(id);
    status.subscribe(data => {
      this.user = data;
    });
  }

  deleteuser(id: any) {
    var status = this._http.deleteuser(id);
    status.subscribe(() => {
      this.removeUserFromLab(this.user.lab._id, this.user);
      this._router.navigate(['/main/allusers']);
    });
  }

  edituser(id: string){
    this._router.navigate(['/main/edituser/'+ id]);
  }

  removeUserFromLab(id: any, user: any) {
    this._http.removeUserFromLab(id, user).subscribe(() => {});
  }
}