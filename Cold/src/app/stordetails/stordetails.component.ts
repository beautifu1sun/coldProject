import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-stordetails',
	templateUrl: './stordetails.component.html',
	styleUrls: ['./stordetails.component.css']
})
export class StordetailsComponent implements OnInit {
	storage: any;
	usersWithAccess: any;

	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) {}

	ngOnInit() {
		this.storage = {
			name: "",
			type: "",
			temp: "",
			location: {
				name: ""
			}
		};
		this._route.params.subscribe((params: Params) => {
			this.getStorageInfo(params['id']);
		});
	}

	getStorageInfo(id: any) {
		this._httpService.getStorageInfo(id).subscribe(data => {
			this.storage = data['data'];
			this.getUserAccessList(this.storage.location._id);
		});
	}

	goStorageView() {
		this._router.navigate(['main/storview']);
	}

	getUserAccessList(id: any) {
		this._httpService.getLabInfo(id).subscribe(data => {
			this.usersWithAccess=data['data']['userList'];
		});
	}

	deleteStorage(id: any) {
		this.removeStorageFromLab();
		this._httpService.deleteStorage(id).subscribe(() => {
			this.goStorageView();
		});
	}

	editStorage(id: string) {
		this._router.navigate(['main/storedit/' + id]);
	}

	removeStorageFromLab() {
		this._httpService.removeStorageFromLab(this.storage.location._id,this.storage).subscribe(() => {});
	}
}