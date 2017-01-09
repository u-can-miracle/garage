var mongoose = require('mongoose');
var Task;

var taskSchema = mongoose.Schema({
	name: {
		type: String
	},
	description: {
		type: String
	}
	isCompleted: {
		type: Boolean,
		default: false
	}
	created_at: {
		type: Date,
		default: Date.now
	}
});


module.exports = mongoose.model('Task', taskSchema);