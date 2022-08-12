const { accounts } = require("../models/accounts.model");


async function createAccounts(params, callback){
    if(!params.name){
        return callback(
            {
                message: "Name Required", 
            },
            ""
        );
    }

    const accountModel = accounts(params);
    accountModel
    .save()
    .then((response) => {
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
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