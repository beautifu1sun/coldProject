import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-sampedit',
	templateUrl: './sampedit.component.html',
	styleUrls: ['./sampedit.component.css']
})
export class SampeditComponent implements OnInit {
	sample: any;
	allLabs = [];
	currentLab: any;
	currentStorage: any;
	availableStorage: any;
	availableResearchers: any;

	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) {}

	ngOnInit() {
		this.sample = {
			name: "",
			type: "",
			container: "",
			description: "",
			location: {
				lab: { _id: "", name: ""},
				storage: {_id: "", name: ""},
			},
			createdBy: {
				_id: "",
				firstname: "",
				lastname: ""
			}
		};
		this._route.params.subscribe((params: Params) => {
			this.getSampleInfo(params['id']);
		});
		this.getLabs();
	}

	getSampleInfo(id: any) {
		this._httpService.getSampleInfo(id).subscribe(data => {
			this.sample=data['data'];
			this.currentLab=this.sample.location.lab;
			this.currentStorage=this.sample.location.storage;
		});
	}

	getLabInfo() {
		this._httpService.getLabInfo(this.sample.location.lab._id).subscribe(data => {
			if (!data['error']) {
				this.availableStorage = data['data']['storageList'];
				this.availableResearchers = data['data']['resList'];
			}
		});
	}

	getLabs() {
		this._httpService.getLabs().subscribe(data => {
			if (!data['error']) {
				this.allLabs = data['data'];
			}
		});
	}

	onSubmit() {
		this._httpService.updateSample(this.sample).subscribe(data => {
			if (!data['error']) {
				this.removeSampleFromStorage();
				this.addSampleToStorage();
				this.goSampView();
			}
		});
	}

	removeSampleFromStorage() {
		this._httpService.removeSampleFromStorage(this.currentStorage._id,this.sample).subscribe(() => {});
	}

	addSampleToStorage() {
		this._httpService.addSampleToStorage(this.sample.location.storage._id, this.sample).subscribe(() => {});
	}

	goSampView() {
		this._router.navigate(['main/sampview']);
	}
}