const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 2
		},
		type: {
			type: String,
			required: true,
			minlength: 2
		},
		temp: {
			type: String,
			required: true
		},
		location: {
			_id: {
				type: String,
				required: true
			},
			name: {
				type: String,
				required: true
			}
		},
		sampleList: [
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
		compartmentList: [
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
	},
	{
		timestamps: true
	}
);