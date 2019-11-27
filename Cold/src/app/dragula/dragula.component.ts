import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dragula',
  templateUrl: './dragula.component.html',
  styleUrls: ['./dragula.component.css', '../../../node_modules/dragula/dist/dragula.css']
})
export class DragulaComponent implements OnInit {
  allLabs = [];
  lab1: string;
  lab2: string;
  storage1ID: string;
  storage2ID: string;
  storage1 = [];
  storage2 = [];
  showStorage1: boolean;
  showStorage2: boolean;
  dragula1: boolean;
  dragula2: boolean;
	availableStorages1 = [];
	availableStorages2 = [];
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.showStorage1 = false;
    this.showStorage2 = false;
    this.lab1 = "";
    this.lab2 = "";
    this.storage1ID = "";
    this.storage2ID = "";
    this.dragula1 = false;
    this.dragula2 = false;
    this.getLabs();
  }

  getLabs() {
		this._httpService.getLabs().subscribe(data => {
			if (!data['error']) {
        this.allLabs = data['data'];
			}
		});
  }

  getLab(label: number, id: any) {
    this._httpService.getLabInfo(id).subscribe(data => {
			if (!data['error']) {
        if (label == 1) {
          this.showStorage1 = true;
          this.availableStorages1 = data['data']['storageList'];
        } else if (label == 2) {
          this.showStorage2 = true;
          this.availableStorages2 = data['data']['storageList'];
        }
			}
		});
  }

  createDragula(label: number) {
    if (label == 1) {
      this._httpService.getStorageInfo(this.storage1ID).subscribe(data => {
        this.storage1 = data['data'];
        this.dragula1 = true;
      });
    } else if (label == 2) {
      this._httpService.getStorageInfo(this.storage2ID).subscribe(data => {
        this.storage2 = data['data'];
        this.dragula2 = true;
      });
    }
  }

  applyChanges() {
    this._httpService.updateStorage(this.storage1).subscribe(() => {
      this._httpService.updateStorage(this.storage2).subscribe(() => {});
    });
    this.ngOnInit();
  }
}
