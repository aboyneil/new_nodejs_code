const { accounts } = require("../models/accounts.model");
var bcrypt = require('bcrypt');




async function createAccounts(params, callback){
    const salt = await bcrypt.genSalt(10);
    if(!params.name){
        return callback(
            {
                message: "Name Required", 
            },
            ""
        );
    } else if(!params.password){
        return callback(
            {
                message: "Password Required",
            },
            ""
        );
    }



    params.password= await bcrypt.hash(params.password, salt);

            const accountModel = accounts(params);
                accountModel
            .save()
            .then((response) => {
                return callback(null, response);
            })
            .catch((error)=>{
                return callback("Account already Exist");
            });
 

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

async function verifyAccount(params){
    const userName = params.username;
    const eMail = params.email;
    var array = [];

    let isUsername = new Boolean(false);
    let isEmail = new Boolean(false);


    accounts.findOne({username: userName}).then((response)=>{
        if(response){
            array[0] = true;
        }
        else{
            array[0] = false;
        }
    }).catch((error)=>{
        return callback(error);
    });

    accounts.findOne({email: eMail}).then((response)=>{
        if(response){
            array[1] = true;
        }
        else{
            array[1] = false;
        }
    }).catch((error)=>{
        return callback(error);
    });

    return array;

    

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