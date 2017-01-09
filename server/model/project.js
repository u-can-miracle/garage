var mongoose = require('mongoose');
var Project;

var projectSchema = mongoose.Schema({
	name: {
		type: String
	},
	tasks: [{
		type: Schema.Types.ObjectId,
		ref: 'Task',
		default: null
	}],
	created_at: {
		type: Date,
		default: Date.now
	}
});


module.exports = mongoose.model('Project', projectSchema);