import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-storedit',
	templateUrl: './storedit.component.html',
	styleUrls: ['./storedit.component.css']
})
export class StoreditComponent implements OnInit {
	storage: any;
	allLabs: any;
	currentLab: any;

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
		this.allLabs = [];
		this._route.params.subscribe((params: Params) => {
			this.getStorageInfo(params['id']);
		});
		this.getLabs();
	}

	getStorageInfo(id: any) {
		this._httpService.getStorageInfo(id).subscribe(data => {
			this.storage = data['data'];
			this.currentLab = data['data']['location'];
		});
	}

	goStorageView() {
		this._router.navigate(['main/storview']);
	}

	getLabs() {
		this._httpService.getLabs().subscribe(data => {
			if (!data['error']) {
				this.allLabs = data['data'];
			}
		});
	}

	onSubmit() {
		this._httpService.updateStorage(this.storage).subscribe(data => {
			if (!data['error']) {
				this.removeStorageFromLab();
				this.addStorageToLab(this.storage);
				this.goStorageView();
			}
		});
	}

	removeStorageFromLab() {
		this._httpService.removeStorageFromLab(this.currentLab._id,this.storage).subscribe(() => {});
	}

	addStorageToLab(storage: any) {
		this._httpService.addStorageToLab(storage).subscribe(()=> {});
	}
}