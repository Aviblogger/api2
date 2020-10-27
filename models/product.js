const mongoose = require('mongoose');
//mongoose.set('useCreateIndex', true);
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true,
	},
	date: {
	type: Date,
	default: Date.now
	}

});

module.exports = Product = mongoose.model('product',productSchema);