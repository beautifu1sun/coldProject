import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
	selector: 'app-storview',
	templateUrl: './storview.component.html',
	styleUrls: ['./storview.component.css']
})
export class StorviewComponent implements OnInit {
	allStorage: any;

	constructor(
		private _httpService: HttpService,
	) {}

	ngOnInit() {
		this.getStorage();
	}

	getStorage() {
		this._httpService.getStorage().subscribe(data => {
			if (!data['error']) {
				this.allStorage = data['data'];
			}
		});
	}
}