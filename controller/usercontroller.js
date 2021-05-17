var User = require('../models/user');

exports.createUser = function(req,res,next){

	var userOb = new User({

	 firstName : req.body.firstName,
	 lastName : req.body.lastName,
	 address : req.body.address,
	 contact : req.body.contact,
   dateOfBirth : req.body.dateOfBirth

    })
    userOb.save(function(err){
    	if(err){
    		console.log(err)
    		res.json({msg:"User not saved"})
    	}
    	else{
    		console.log("success")
    		res.json({msg:"User Saved"})
    	}
     })
   }

  exports.getUser = function(req,res,next){
    	User.find().exec(function(err,user_list){
    		res.json(user_list)
    	})
    }

    exports.getUserById = function(req,res,next){
    	User.findById(req.params.id).exec(function(err,userName){
    		res.json(userName)
    	})
    }
 
  exports.deleteUser = function(req,res,next){
  	    User.findById(req.params.id).remove()
  	    .exec(function(){
  	    	res.json({msg:"User Deleted"})
  	    })
  } 

  exports.updateUser = (req, res) => {

   User.findByIdAndUpdate(req.params.id, {
   firstName : req.body.firstName,
	 lastName : req.body.lastName,
	 address : req.body.address,
	 contact : req.body.contact,
     dateOfBirth : req.body.dateOfBirth
    }, {new: true})
    .then(userOb => {
        if(!userOb) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send(userOb);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating userOb with id " + req.params.id
        });
    });
};