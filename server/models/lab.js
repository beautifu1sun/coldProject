const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 2
		},
		BSL: {
			type: Number,
			required: true
		},
		storageList: [
			{
				_id: {
					type: String,
					required: true
				},
				name: {
					type: String,
					required: true
				}
			}
		],
		userList: [
			{
				_id: {
					type: String,
					required: true
				},
				firstname: {
					type: String,
					required: true
				},
				lastname: {
					type: String,
					required: true
				}
			}
		],
	}, {
		timestamps: true
	}
);