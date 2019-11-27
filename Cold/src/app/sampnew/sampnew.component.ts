import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sampnew',
	templateUrl: './sampnew.component.html',
	styleUrls: ['./sampnew.component.css']
})
export class SampnewComponent implements OnInit {
	newSample: any;
	allLabs = [];
	availableStorage = [];
	availableResearchers = [];

	constructor(
		private _httpService: HttpService,
		private _router: Router
	) {}

	ngOnInit() {
		this.newSample = {
			name: "",
			type: "",
			container: "",
			description: "",
			location: {
				lab: { _id:"", name:"" },
				storage: { _id:"", name:"" },
			},
			createdBy: {
				_id: "",
				firstname: "",
				lastname: ""
			}
		}
		this.getLabs();
	}

	getLabs() {
		this._httpService.getLabs().subscribe(data => {
			if (!data['error']) {
				this.allLabs = data['data'];
			}
		});
	}

	getLabInfo() {
		this._httpService.getLabInfo(this.newSample.location.lab._id).subscribe(data => {
			if (!data['error']) {
				this.availableStorage = data['data']['storageList'];
				this.availableResearchers = data['data']['userList'];
			}
		});
	}

	onSubmit() {
		this._httpService.createSample(this.newSample).subscribe(data => {
			if (!data['error']) {
				this.addSampleToStorage(this.newSample.location.storage._id, data['data']);
				this.goSampView();
			}
		});
	}

	addSampleToStorage(storageID: any, sample: any) {
		this._httpService.addSampleToStorage(storageID, sample).subscribe(() => {});
	}

	goSampView() {
		this._router.navigate(['main/sampview']);
	}
}