import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
	constructor(private _http: HttpClient) {}

	getCdcFeed() {
		return this._http.get('/cdcrss');
	}

	adduser(data: any) {
		return this._http.post('/user', data);
	}

  	login(body: any) {
  		return this._http.put('/user', body);
	}

  	getAll() {
  		return this._http.get('/user');
	}

  	getUser(id: string) {
  		return this._http.get('/user/' + id);
	}

  	deleteuser(id: string) {
  		return this._http.delete('/user/' + id);
	}

  	updateuser(id: string, body: any) {
  		return this._http.put('/user/' + id, body);
	}

	// Lab-related services
	createLab(newLab: any) {
		return this._http.post('/labs', newLab);
	}

	getLabs() {
		return this._http.get('/labs');
	}

	getLabInfo(id: string) {
		return this._http.get('/labs/' + id);
	}

	updateLab(lab: { _id: string; }) {
		return this._http.put('/labs/' + lab._id, lab);
	}

	deleteLab(id: string) {
		return this._http.delete('/labs/' + id);
	}

	addStorageToLab(storage: { location: { _id: string; }; }) {
		return this._http.put('/labs/storage/add/' + storage.location._id, storage);
	}

	removeStorageFromLab(labID: string, storage: any) {
		return this._http.put('/labs/storage/remove/' + labID, storage);
	}

	addUserToLab(user: { lab: { _id: string; }; }) {
		return this._http.put('/labs/user/add/' + user.lab._id, user)
	}

	removeUserFromLab(labID: string, user: any) {
		return this._http.put('/labs/user/remove/' + labID, user)
	}

	// Storage-related services
	createStorage(newStorage: any) {
		return this._http.post('/storage', newStorage);
	}

	getStorage() {
		return this._http.get('/storage');
	}

	getStorageInfo(id: string) {
		return this._http.get('/storage/' + id);
	}

	updateStorage(storage: { _id: string }) {
		return this._http.put('/storage/' + storage._id, storage);
	}

	deleteStorage(id: string) {
		return this._http.delete('/storage/' + id);
	}

	addSampleToStorage(storageID: string, sample: any) {
		return this._http.put('storage/sample/add/' + storageID, sample);
	}

	removeSampleFromStorage(storageID: string, sample: any){
		return this._http.put('storage/sample/remove/' + storageID, sample);
	}

	// Sample-replated services
	createSample(newSample: any) {
		return this._http.post('/sample', newSample);
	}

	getSamples() {
		return this._http.get('/sample');
	}

	getSampleInfo(id: string) {
		return this._http.get('/sample/' + id);
	}

	updateSample(sample: { _id: string; }) {
		return this._http.put('/sample/' + sample._id, sample);
	}

	deleteSample(id: string) {
		return this._http.delete('/sample/' + id);
	}

	findSampleByName(query: string, labsName: string) {
		return this._http.get('/sampleFindByName/' + labsName + "/" + query);
	}

	findSampleByType(query: string, labsName: string) {
		return this._http.get('/sampleFindByType/' + labsName + "/" + query);
	}
}