const { User } = require("../models/user.model");
var bcrypt = require('bcrypt');
const { response } = require("express");




async function createUser(params, callback){
    const salt = await bcrypt.genSalt(10);
    //Check if Email and Username already exist
    await User.findOne({email: params.email}).then(async(response)=>{
        if(!response){
            
            await User.findOne({username: params.username}).then(async(response)=>{
                if(!response){
                    params.password= await bcrypt.hash(params.password, salt);

                const userModel = User(params);
                    userModel
                .save()
                .then((response) => {
                    if(!response) callback("Account already Exist");
                    else return callback(null);
                })
                .catch((error)=>{
                    return callback(error);
                });

                }
                else{
                    return callback("Username Already Exist");
                }
            }).catch((error)=>{
                return callback(error);
            })
        }
        else {
            return callback("Email Already Exist");
        }
    }).catch((error)=>{
        return callback(error);
    })


    
 

}




async function getUser(params, callback){
    const name = params.name;
    var condition = name
    ?   {
        name: { $regex: new RegExp(name), $option: "i"},
        }
    :   {};

    User
    .find(condition)
    .then((response) => {
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}


async function getUserById(params, callback){
    const userId = params.userId;

    User
    .findById(userId)
    .then((response) => {
        if(!response) callback("Account Id Invalid!")
        else return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}



async function updateUser(params, callback){
    const userId = params.userId;

    User
    .findByIdAndUpdate(userId, params, {useFindAndModify: false})
    .then((response) => {
        if(!response) callback("Account Id Invalid!")
        else return callback(error);
    })
    .catch((error)=>{
        return callback(error);
    });
}


async function deleteUser(params, callback){
    const userId = params.userId;

    User
    .findByIdAndRemove(userId)
    .then((response) => {
        if(!response) callback("Account Id Invalid!")
        else return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}


module.exports = {
    createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    
};