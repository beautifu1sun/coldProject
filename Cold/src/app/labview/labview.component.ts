import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
	selector: 'app-labview',
	templateUrl: './labview.component.html',
	styleUrls: ['./labview.component.css']
})
export class LabviewComponent implements OnInit {
	allLabs: any;
	constructor(
		private _httpService: HttpService
	) {}

	ngOnInit() {
		this.getLabs();
	}

	getLabs() {
		this._httpService.getLabs().subscribe(data => {
			if (!data['error']) {
				this.allLabs = data['data'];
			}
		});
	}
}