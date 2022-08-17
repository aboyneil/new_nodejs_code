const { accounts } = require("../models/accounts.model");
var bcrypt = require('bcrypt');
const { response } = require("express");




async function createAccounts(params, callback){
    const salt = await bcrypt.genSalt(10);
    //Check if Email and Username already exist
    await accounts.findOne({email: params.email}).then(async(response)=>{
        if(!response){
            
            await accounts.findOne({username: params.username}).then(async(response)=>{
                if(!response){
                    params.password= await bcrypt.hash(params.password, salt);

                const accountModel = accounts(params);
                    accountModel
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




async function getAccounts(params, callback){
    const name = params.name;
    var condition = name
    ?   {
        name: { $regex: new RegExp(name), $option: "i"},
        }
    :   {};

    accounts
    .find(condition)
    .then((response) => {
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}


async function getAccountsById(params, callback){
    const accountId = params.accountId;

    accounts
    .findById(accountId)
    .then((response) => {
        if(!response) callback("Account Id Invalid!")
        else return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}



async function updateAccounts(params, callback){
    const accountId = params.accountId;

    accounts
    .findByIdAndUpdate(accountId, params, {useFindAndModify: false})
    .then((response) => {
        if(!response) callback("Account Id Invalid!")
        else return callback(error);
    })
    .catch((error)=>{
        return callback(error);
    });
}


async function deleteAccounts(params, callback){
    const accountId = params.accountId;

    accounts
    .findByIdAndRemove(accountId)
    .then((response) => {
        if(!response) callback("Account Id Invalid!")
        else return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}


module.exports = {
    createAccounts,
    getAccounts,
    getAccountsById,
    updateAccounts,
    deleteAccounts,
    
};