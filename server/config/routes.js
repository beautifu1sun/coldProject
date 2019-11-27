const controller = require('../controllers/controller');
const path = require('path');

module.exports = (app) => {
	app.post('/user', (req, res) => {
		controller.adduser(req, res);
	});
	app.put('/user', (req, res) => {
		controller.login(req, res);
	});
	app.get('/user', (req, res) => {
		controller.getallusers(req, res);
	});
	app.get('/user/:id', (req, res) => {
		controller.getoneuser(req, res);
	});
	app.delete('/user/:id', (req, res) => {
		controller.deleteuser(req, res);
	});
	app.put('/user/:id', (req, res) => {
		controller.updateuser(req, res);
	});

	// Lab routes
	app.get('/labs', (req, res) => {
		controller.getLabs(req, res);
	});
	app.get('/labs/:id', (req, res) => {
		controller.getOneLab(req, res);
	});
	app.post('/labs', (req, res) => {
		controller.createLab(req, res);
	});
	app.delete('/labs/:id', (req, res) => {
		controller.deleteLab(req, res);
	});
	app.put('/labs/:id', (req, res) => {
		controller.updateLab(req, res);
	});
	app.put('/labs/storage/add/:id', (req, res) => {
		controller.addStorLab(req, res);
	});
	app.put('/labs/storage/remove/:id', (req, res) => {
		controller.removeStorLab(req, res);
	});
	app.put('/labs/user/add/:id', (req, res) => {
		controller.addUserLab(req, res);
	});
	app.put('/labs/user/remove/:id', (req, res) => {
		controller.removeUserLab(req, res);
	});

	// Storage routes
	app.get('/storage', (req, res) => {
		controller.getStorage(req, res);
	});
	app.get('/storage/:id', (req,res) => {
		controller.getOneStorage(req, res);
	});
	app.post('/storage', (req, res) => {
		controller.createStorage(req, res);
	});
	app.delete('/storage/:id', (req, res) => {
		controller.deleteStorage(req, res);
	});
	app.put('/storage/:id', (req, res) => {
		controller.updateStorage(req, res);
	});
	app.put('/storage/sample/add/:id', (req, res) => {
		controller.addSampStor(req, res);
	});
	app.put('/storage/sample/remove/:id', (req, res) => {
		controller.removeSampStor(req, res);
	});

	// Sample routes
	app.get('/sample', (req, res) => {
		controller.getSamples(req, res);
	});
	app.get('/sampleFindByType/:labsname/:query', (req, res) => {
		controller.findSamplesByType(req, res);
	});
	app.get('/sampleFindByName/:labsname/:query', (req, res) => {
		controller.findSamplesByName(req, res);
	});
	app.get('/sample/:id', (req, res) => {
		controller.getOneSample(req, res);
	});
	app.post('/sample', (req, res) => {
		controller.createSample(req, res);
	});
	app.delete('/sample/:id', (req, res) => {
		controller.deleteSample(req, res);
	});
	app.put('/sample/:id',(req, res) => {
		controller.updateSample(req, res);
	});

	app.get('/cdcrss', (req, res) => {
		controller.cdcRss(req, res);
	});

	app.all('*', (_req, res, _next) => {
		res.sendFile(path.resolve('./Cold/dist/index.html'));
	})
}