const mongoose = require('mongoose');
var Feed = require('rss-to-json');

mongoose.Promise = global.Promise;
const User = mongoose.model('User');
const Lab = mongoose.model('Lab');
const Storage = mongoose.model('Storage');
const Sample = mongoose.model('Sample');

mongoose.connect('mongodb://localhost/cold');

module.exports = {
	findSamplesByName(req, res) {
		Sample.find({ name: { '$regex': '^' + req.params.query, $options: 'i' }, 'location.lab.name': req.params.labsname }, (err, samples) => {
			if (!err) {
				res.json({ message: "Success", data: samples })
			} else {
				res.json({ message: "Error", error: err })
			}
		});
	},

	findSamplesByType(req, res) {
		Sample.find({ type: { '$regex': '^' + req.params.query, $options: 'i' }, 'location.lab.name': req.params.labsname }, (err, samples) => {
			if (!err) {
				res.json({ message: "Success", data: samples });
			} else {
				res.json({ message: "Error", error: err });
			}
		});
	},

	cdcRss(_req, res){
		Feed.load('https://t.cdc.gov/feed.aspx?format=rss2', (err, rss) => {
      		if (err) {
      		  res.json({ message: "Error", error: err });
      		} else {
      		  res.json({ message: "Success. Rss feed has been loaded.", rss: rss });
      		}
    	});
	},

	adduser: (req, res) => {
		var newUser = new User(req.body);
		newUser.save((err) => {
			if (err) {
				res.json(err);
			} else {
				res.json({ success: 'added', data: newUser });
			}
		});
	},

	login: (req, res) => {
		User.findOne({ username: req.body.username }, (err, user) => {
			if (err) { console.log(err); }
			if (user) {
				if (user.password == req.body.password) {
					res.json({ success: 'logged' });
				} else{
					res.json({ error: 'Invalid Password!' });
				}
			} else {
				res.json({ error: 'User does not exist' });
			}
		});
	},

	getallusers: (_req, res) => {
		User.find({}, null, { sort: { firstname: 1 } }, (err, all) => {
			if (err) {
				console.log(err);
			} else {
				res.json(all);
			}
		});
	},

	getoneuser: (req, res) => {
		User.findOne({ _id: req.params.id }, (err, user) => {
			if (err) {
				console.log(err);
			} else{
				res.json(user);
			}
		});
	},

	deleteuser: (req, res) => {
		User.remove({ _id: req.params.id }, (err) => {
			if (err) {
				console.log(err);
			} else {
				res.json({ success: 'removed' });
			}
		});
	},

	updateuser: (req, res) => {
		User.update({ _id: req.params.id }, req.body, { runValidators: true }, (err, _data) => {
			if (err) {
				res.json(err);
			} else {
				res.json({ success: 'updated' });
			}
		});
	},

	// functions for labs
	getLabs: (_req, res) => {
		Lab.find({}, (err, labs) => {
			if (!err) {
				res.json({ message: "Success", data: labs });
			} else {
				res.json({ message: "Error", error: err });
			}
		});
	},

	getOneLab: (req, res) => {
		Lab.findOne({ _id: req.params.id }, (err, lab) => {
			if (err) {
				res.json({ message: "Error", error: err });
			} else {
				res.json({ message: "Success", data:lab });
			}
		});
	},

	createLab: (req, res) => {
		var lab = new Lab({ name: req.body.name, BSL: req.body.BSL });
		lab.save(function(err) {
			if (err) {
				res.json({ message: "Error", error: err });
			} else {
				res.json({ message: "Success" });
			}
		});
	},

	deleteLab: (req, res) => {
		Lab.remove({ _id: req.params.id }, (err) => {
			if (err) {
				res.json({ message: "Error", error: err });
			} else {
				res.json({ message: "Success" });
			}
		})
	},

	updateLab: (req, res) => {
		Lab.update({ _id: req.params.id }, { name: req.body.name, BSL: req.body.BSL }, { runValidators: true }, (err) => {
			if (err) {
				res.json({ message: "Error", error: err });
			} else {
				res.json({ message: "Success" });
			}
		});
	},

	addStorLab: (req, res) => {
		Lab.findOne({ _id: req.params.id }, (err, lab) => {
			if (err) {
				res.json({ message: "Error", error: err });
			} else {
				lab.storageList.push({ _id: req.body._id, name: req.body.name });
				lab.save(function(err) {
					if (err) {
						res.json({ message: "Error", error: err });
					} else {
						res.json({ message: "Success" });
					}
				});
			}
		});
	},

	removeStorLab: (req, res) => {
		Lab.findOne({ _id: req.params.id }, (err, lab) => {
			if (err) {
				res.json({ message: "Error", error: err });
			} else {
				for (let i = 0; i < lab['storageList'].length; i++) {
					if (lab.storageList[i]._id == req.body._id) {
						lab.storageList.splice(i, 1);
						lab.save(function(err) {
							if (err) {
								res.json({ message: "Error", error: err });
							} else {
								res.json({ message: "Success" });
							}
						});
					}
				}
			}
		});
	},

	addUserLab: (req, res) => {
		Lab.findOne({ _id: req.params.id }, (err, lab) => {
			if (err) {
				res.json({ message: "Error", error: err });
			} else {
				lab.userList.push({ _id:req.body._id, firstname: req.body.firstname, lastname: req.body.lastname });
				lab.save(function(err) {
					if (err) {
						res.json({ message: "Error", error: err });
					} else {
						res.json({ message: "Success" });
					}
				});
			}
		});
	},

	removeUserLab: (req, res) => {
		Lab.findOne({ _id: req.params.id }, (err, lab) => {
			if (err) {
				res.json({ message: "Error", error: err });
			} else {
				for (let i = 0; i < lab['userList'].length; i++) {
					if (lab.userList[i]._id == req.body._id) {
						lab.userList.splice(i,1);
						lab.save(function(err) {
							if (err) {
								res.json({ message: "Error", error: err });
							} else {
								res.json({ message: "Success" });
							}
						});
					}
				}
			}
		});
	},

	// functions for storage
	getStorage: (_req, res) => {
		Storage.find({}, (err, storage) => {
			if (!err) {
				res.json({ message: "Success", data: storage });
			} else {
				res.json({ message: "Error", error: err });
			}
		});
	},

	getOneStorage: (req, res) => {
		Storage.findOne({ _id: req.params.id }, (err, storage) => {
			if (err) {
				res.json({ message: "Error", error: err });
			} else {
				res.json({ message: "Success", data: storage });
			}
		});
	},

	createStorage: (req, res) => {
		var storage = new Storage({ name: req.body.name, type: req.body.type, temp: req.body.temp, location: req.body.location });
		storage.save(function(err) {
			if (err) {
				res.json({ message: "Error", error: err });
			} else {
				res.json({ message: "Success", data:storage });
			}
		});
	},

	deleteStorage: (req, res) => {
		Storage.remove({ _id: req.params.id }, (err) => {
			if (err) {
				res.json({ message: "Error", error: err });
			} else {
				res.json({ message: "Success" });
			}
		});
	},

	updateStorage: (req, res) => {
		Storage.update({ _id: req.params.id }, req.body, { runValidators: true }, (err) => {
			if (err) {
				res.json({ message: "Error", error: err });
			} else {
				res.json({ message: "Success" });
			}
		});
	},

	addSampStor: (req, res) => {
		Storage.findOne({ _id: req.params.id }, (err, storage) => {
			if (err) {
				res.json({ message: "Error", error: err });
			}
			else{
				storage.sampleList.push({ _id: req.body._id, name: req.body.name });
				storage.save(function(err) {
					if (err) {
						res.json({ message: "Error", error: err });
					} else {
						res.json({ message: "Success" });
					}
				})
			}
		});
	},

	removeSampStor: (req, res) => {
		Storage.findOne({ _id: req.params.id }, (err, storage) => {
			if (err) {
				res.json({ message: "Error", error: err });
			} else {
				for (let i = 0; i < storage['sampleList'].length; i++) {
					if (storage.sampleList[i]._id == req.body._id) {
						storage.sampleList.splice(i,1);
						storage.save(function(err) {
							if (err) {
								res.json({ message: "Error", error: err });
							} else {
								res.json({ message: "Success" });
							}
						})
					}
				}
			}
		});
	},

	// Functions for samples
	getSamples: (_req, res) => {
		Sample.find({}, (err, samples) => {
			if (!err) {
				res.json({ message: "Success", data: samples });
			} else {
				res.json({ message: "Error", error: err });
			}
		});
	},

	getOneSample: (req, res) => {
		Sample.findOne({ _id: req.params.id }, (err, sample) => {
			if (err) {
				res.json({ message: "Error", error: err });
			} else {
				res.json({ message: "Success", data:sample });
			}
		});
	},
	createSample: (req, res) => {
		var sample = new Sample({
			name: req.body.name,
			type: req.body.type,
			container: req.body.container,
			description: req.body.description,
			location: req.body.location,
			createdBy: req.body.createdBy
		});
		sample.save(function(err) {
			if (err) {
				res.json({ message: "Error", error: err });
			} else {
				res.json({ message: "Success", data:sample });
			}
		});
	},
	deleteSample: (req, res) => {
		Sample.remove({ _id: req.params.id }, (err) => {
			if (err) {
				res.json({ message: "Error", error: err });
			} else {
				res.json({ message: "Success" });
			}
		});
	},

	updateSample: (req, res) => {
		Sample.update(
			{
				_id: req.params.id
			},
			{
				name: req.body.name,
				type: req.body.type,
				container: req.body.container,
				description: req.body.description,
				location:req.body.location,
				createdBy:req.body.createdBy
			},
			{
				runValidators: true
			},
			(err) => {
				if (err) {
					res.json({ message: "Error", error: err });
				} else {
					res.json({ message: "Success" });
				}
			}
		);
	},
}