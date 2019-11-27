import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-labedit',
	templateUrl: './labedit.component.html',
	styleUrls: ['./labedit.component.css']
})
export class LabeditComponent implements OnInit {
	lab: any;
	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) {}

	ngOnInit() {
		this.lab = {
			name: " ",
			BSL: 1
		};
		this._route.params.subscribe((params: Params) => {
			this.getLabInfo(params['id']);
		});
	}

	getLabInfo(id: any) {
		this._httpService.getLabInfo(id).subscribe(data => {
			this.lab = data['data'];
		});
	}

	goLabView() {
		this._router.navigate(['main/labview']);
	}

	onSubmit() {
		this._httpService.updateLab(this.lab).subscribe(data => {
			if (!data['error']) {
				this.goLabView();
			}
		});
	}
}
