const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Product = require('../../models/product');
const { check, validationResult } = require('express-validator');


router.get('/',auth, async(req, res) => {
		
		
try{
	const products = await Product.find().exec();
		res.json(products);
}
catch(err)
	{
		console.error(err.message);
		res.status(500).send('Server Error')
	}
	});


router.post('/',[ auth, [
	check('name','name is required')
		.not()
		.isEmpty(),
	check('price','price is required')
		.not()
		.isEmpty()

		]
	], async(req, res) => {

	const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array() });
		}
		
try{
	const createProduct = new Product({
			name:req.body.name,
			price:req.body.price,			
		});
		console.log(createProduct);
		const result = await createProduct.save();
		res.json(result);


}catch(err)
{
	console.error(err.message);
		res.status(500).send('server Error');
}
	});



router.put('/update/:id',auth, /*[ auth, [
	check('name','name is required')
		.not()
		.isEmpty(),
	check('price','price is required')
		.not()
		.isEmpty()

		]
	],*/
	async(req, res) => {
/*
	const id = req.params.id;
	console.log(id);
	const update = req.body;
		console.log(update);
	const result = await Product.findOneAndUpdate({"_id":id},update);

	res.json(result);
*/
/*const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array() });
		}
	*/	
const {name,price} = req.body;
const id = req.params.id;
console.log(req.body);

	try {
		let product = await Product.findOne({ _id: id});
		if(product) {
			product = await Product.findOneAndUpdate(
				{ _id: id},
				{ $set: req.body},
				{ new: true}
				);
			return res.json(product)

		}

		res.json(product)

		

	}catch(err)
	{
		console.error(err.message);
		res.status(500).send('Server Error')
	}
	
	});

router.delete('/delete/:id',auth, async(req, res) => {


	
	try {
		const id = req.params.id;
	console.log(id);
	const update = req.body;
		//console.log(update);
		if(id) {
	const result = await Product.findOneAndDelete({"_id":id},update);

	res.json(result);
 }


		
	}catch(err)
	{
		console.error(err.message);
		res.status(500).send('Server Error')
	}


});

router.get('/:id', async(req, res) => {
	const id = req.params.id;
	
try{
	if (id) {
	console.log(id);
	const update = req.body;
		//console.log(update);
	const result = await Product.findOne({"_id":id});

	res.json(result);
		}


	}catch(err)
	{
		console.error(err.message);
		res.status(500).send('Server Error')
	}


	});


module.exports = router;