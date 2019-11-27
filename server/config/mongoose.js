const mongoose = require('mongoose');
const validation = require('mongoose-beautiful-unique-validation');

const userSchema = require('../models/user');
userSchema.plugin(validation);
mongoose.model('User', userSchema);

const labSchema = require('../models/lab');
mongoose.model('Lab', labSchema);

const storageSchema = require('../models/storage');
mongoose.model('Storage', storageSchema);

const sampleSchema = require('../models/sample');
mongoose.model('Sample', sampleSchema);