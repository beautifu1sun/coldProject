import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
	selector: 'app-sampview',
	templateUrl: './sampview.component.html',
	styleUrls: ['./sampview.component.css']
})
export class SampviewComponent implements OnInit {
	allSamples: any;

	constructor(
		private _httpService: HttpService,
	) {}

	ngOnInit() {
		this.getSamples();
	}

	getSamples() {
		this._httpService.getSamples().subscribe(data => {
				this.allSamples = data['data'];
		});
	}
}