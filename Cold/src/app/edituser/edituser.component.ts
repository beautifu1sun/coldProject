import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  updateUser: any;
  id: any;
  errors: any;
  allLabs: any;
  currentLab: any;
  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })
    this.currentLab = '';
    this.getUser(this.id);
    this.updateUser = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      lab: { _id: '', name: '' },
      password: '',
      confirm: ''
    };
    this.errors = {
      first: '',
      last: '',
      username: '',
      email: '',
      password: '',
      confirm: ''
    };
    this.getLabs();
  }

  getLabs() {
    this._http.getLabs().subscribe(data => {
      if (!data['error']) {
        this.allLabs = data['data'];
      }
    });
  }

  getUser(id: any) {
    var status = this._http.getUser(id);
    status.subscribe(data => {
      this.updateUser = data;
      this.currentLab = this.updateUser.lab;
    });
  }

  addUserToLab(user: any) {
    this._http.addUserToLab(user).subscribe(() => {});
  }

  removeUserFromLab(id: any, user: any) {
    this._http.removeUserFromLab(id, user).subscribe(() => {});
  }

  goback() {
    this._router.navigate(['/viewuser/'+this.id]);
  }

  updateuser() {
    if (this.updateUser['password'] != this.updateUser['confirm']) {
      this.errors['confirm'] = 'Passwords must match!';
    } else {
      var status = this._http.updateuser(this.id, this.updateUser)
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
            } else if (data['errors']['lastname']['kind'] == 'minlength') {
              this.errors = { first: '', last: 'Last name must be greater than 3 characters', username: '', email: '', password: '', confirm: '' };
            }
          } else if (data['errors']['username']) {
            if (data['errors']['username']['kind'] == 'required') {
              this.errors = { first: '', last: '', username: 'Username is required', email: '', password: '', confirm: '' };
            } else if (data['errors']['username']['kind'] == 'minlength') {
              this.errors = { first: '', last: '', username: 'Username must be greater than 3 characters', email: '', password: '', confirm: '' };
            } else if (data['errors']['username']['kind'] == 'unique') {
              this.errors = { first: '', last: '', username: 'Username is already taken', email: '', password: '', confirm: '' };
            }
          } else if (data['errors']['password']) {
            if (data['errors']['password']['kind'] == 'required') {
              this.errors = { first: '', last: '', username: '', email: '', password: 'Password is required', confirm: '' };
            } else if(data['errors']['password']['kind'] == 'minlength') {
              this.errors = { first: '', last: '', username: '', email: '', password: 'Password must be at least 6 characters', confirm: '' };
            }
          } else if (data['errors']['email']) {
            if (data['errors']['email']['kind'] == 'required') {
              this.errors = { first: '', last: '', username: '', email: 'Email is required', password: '', confirm: '' };
            } else if (data['errors']['email']['kind'] == 'minlength') {
              this.errors = { first: '', last: '', username: '', email: 'Invalid email', password: '', confirm: '' };
            } else if (data['errors']['email']['kind'] == 'unique') {
              this.errors = { first: '', last: '', username: '', email: 'Email already exists', password: '', confirm: '' };
            }
          }
        } else {
          this.addUserToLab(this.updateUser);
          this.removeUserFromLab(this.currentLab._id, this.updateUser);
          this._router.navigate(['/viewuser/'+this.id]);
        }
      });
    }
  }
}