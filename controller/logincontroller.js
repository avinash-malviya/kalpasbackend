var User = require('../models/login');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth')
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');
const jwt = require('jsonwebtoken');

exports.addUser = [
body('username').isLength({min:3}).trim().withMessage("Min 3 char"),
async function(req,res,next){
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		res.json({status:0, data:"validation failed", debug_data: errors.array()});

	}else{
		let user = await User.findOne({
			username:req.body.username
		});
		if(user){
			return res.status(400).json({
				msg:"User Already exist"
			});

		}
		const salt = await bcrypt.genSalt(10);
		let encryptedPassword = await bcrypt.hash(req.body.password, salt);
		var userOb = new User({
			username:req.body.username,
			password:encryptedPassword,
		});
		userOb.save(function(err){
			if(err){
				res.json({status:0,debug_data:err});
			}else{
				res.json({status:1,data:"user saved successfully"});
			}
		})
	  }
   }
] 

exports.login = [
body('username').isLength({min:3}).trim().withMessage("Min 3 char"),
async function (req,res,next){
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		res.json({status:0, data:"validation failed",debug_data: errors.array()});

	}else {
		const { username,password } =req.body;
		let user = await User.findOne({
			username:req.body.username
		});
		if (!user){
			return res.status(400).json({
				message: "User Not Exist"
			});
		}
		const passCorrect = await bcrypt.compare(password, user.password);
		if(!passCorrect){
			return res.status(400).json({
				message: " Password wrong"
			});
		}

		const payload = {
			user: {
				    id: user.id,
				    username:username
			       }
		};

		jwt.sign(
			payload,
			"secretString",
			{
				expiresIn:1200
			},
			(err, token)=>{
				if (err) throw err;
				res.status(200).json({
					token
				});
			  }
			);
	    }
    }   
]

exports.restrictedPage = [
auth,
async (req,res)=>{
	res.json({ data:" You can access details"})
}]