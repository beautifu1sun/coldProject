const express = require('express');
const bp = require('body-parser');
const app = express();
const port = 8000;

app.use(bp.json());
app.use(express.static(__dirname+'/Cold/dist'));

require('./server/config/mongoose');
require('./server/config/routes')(app);

app.listen(port);