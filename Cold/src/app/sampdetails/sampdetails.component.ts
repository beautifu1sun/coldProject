import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-sampdetails',
	templateUrl: './sampdetails.component.html',
	styleUrls: ['./sampdetails.component.css']
})
export class SampdetailsComponent implements OnInit {
	sample:any
	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) { }

	ngOnInit() {
		this.sample = {
			name:"",
			type:"",
			container:"",
			description:"",
			location:{
				lab:{_id:"", name:""},
				storage:{_id:"", name:""},
			},
			createdBy:{
				_id:"",
				firstname:"",
				lastname:""
			}
		}
		this._route.params.subscribe((params: Params) =>{
			this.getSampleInfo(params['id'])
		})
	}
	getSampleInfo(id){
		this._httpService.getSampleInfo(id).subscribe(data=>{
			this.sample=data['data']
		})
	}
}
