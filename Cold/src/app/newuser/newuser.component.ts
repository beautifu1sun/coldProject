import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  newuser: any;
  errors: any;
  allLabs: any;

  constructor(
    private _http: HttpService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.newuser = { firstname: '', lastname: '', username: '', email: '',lab:{_id:'', name:''}, password: '', confirm: '' };
    this.errors = { first: '', last: '', username: '', email: '', password: '', confirm: '' };
    this.getLabs();
  }

  getLabs() {
    this._http.getLabs().subscribe(data => {
      if (!data['error']) {
        this.allLabs = data['data'];
      }
    });
  }

  addUserToLab(user: any) {
    this._http.addUserToLab(user).subscribe(() => {});
  }

  goback() {
    this._router.navigate(['/main']);
  }

  adduser() {
    if (this.newuser['password'] != this.newuser['confirm']) {
      this.errors['confirm'] = 'Passwords must match';
    } else {
      var status = this._http.adduser(this.newuser);
      status.subscribe(data => {
        if (data['errors']) {
          if (data['errors']['firstname']) {
            if (data['errors']['firstname']['kind'] == 'required') {
              this.errors = { first: 'First name is required', last: '', username: '', email: '', password: '', confirm: '' };
            } else if (data['errors']['firstname']['kind'] == 'minlength') {
              this.errors = { first: 'First name must be greater than 3 characters', last: '', username: '', email: '', password: '', confirm: '' };
            }
          } else if (data['errors']['lastname']) {
            if (data['errors']['lastname']['kind'] == 'required') {
              this.errors = { first: '', last: 'Last name is required', username: '', email: '', password: '', confirm: '' };
            } else if (data['errors']['lastname']['kind'] =='minlength') {
              this.errors = { first: '', last: 'Last name must be greater than 3 characters', username: '', email: '', password: '', confirm: '' };
            }
          } else if (data['errors']['username']) {
            if (data['errors']['username']['kind'] == 'required') {
              this.errors = { first: '', last: '', username: 'Username is required', email: '', password: '', confirm: '' };
            } else if (data['errors']['username']['kind'] == 'minlength') {
              this.errors = { first: '', last: '', username: 'Username must be greater than 3 characters', email: '', password: '', confirm: '' };
            } else if (data['errors']['username']['kind'] == 'unique') {
              this.errors = {first: '', last: '', username: 'Username is already taken', email: '', password: '', confirm: '' };
            }
          } else if (data['errors']['password']) {
            if (data['errors']['password']['kind'] == 'required') {
              this.errors = { first: '', last: '', username: '', email: '', password: 'Password is required', confirm: '' };
            } else if (data['errors']['password']['kind'] == 'minlength') {
              this.errors = { first: '', last: '', username: '', email: '', password: 'Password must be at least 6 characters', confirm: '' };
            }
          } else if (data['errors']['email']) {
            if (data['errors']['email']['kind'] == 'required') {
              this.errors = { first: '', last: '', username: '', email: 'Email is required', password: '', confirm: '' };
            } else if (data['errors']['email']['kind'] == 'minlength') {
              this.errors = { first: '', last: '', username: '', email: 'Invalid Email', password: '', confirm: '' };
            } else if (data['errors']['email']['kind'] == 'unique') {
              this.errors = { first: '', last: '', username: '', email: 'Email already exists', password: '', confirm: '' };
            }
          }
        } else {
          if (data['data']['lab']['name'] != '') {
            this.addUserToLab(data['data']);
          }
          this._router.navigate(['/main/allusers']);
        }
      });
    }
  }
}