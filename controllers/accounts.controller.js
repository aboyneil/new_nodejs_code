const accountServices = require("../services/accounts.services");
const upload = require("../middleware/upload");

exports.create = (req, res, next) => {
    upload(req, res, function(err){
        if(err){
            next(err);
        } else {
            const url = req.protocol + "://" + req.get("host");
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                mobileNumber: req.body.mobileNumber,
                password: req.body.password,
            };

            accountServices.createAccounts(model, (error, results)=>{
                if(error){
                    return next(error);
                } else {
                    return res.status(200).send({
                        message: "Success",
                        data: results
                    });
                }
            });
        }
    });
};


exports.findAll = (req, res, next) => {
            var model = {
                name: req.query.name,

            };

            accountServices.getAccounts(model, (error, results)=>{
                if(error){
                    return next(error);
                } else {
                    return res.status(200).send({
                        message: "Success",
                        data: results
                    });
                }
            });

};

exports.findOne = (req, res, next) => {
    var model = {
        accountId: req.params.id,

    };

    accountServices.getAccountsById(model, (error, results)=>{
        if(error){
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });

};


exports.update = (req, res, next) => {
    upload(req, res, function(err){
        if(err){
            next(err);
        } else {
            const url = req.protocol + "://" + req.get("host");
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                accountId: req.params.id,
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                mobileNumber: req.body.mobileNumber,
                password: req.body.password,
            };

            accountServices.updateAccounts(model, (error, results)=>{
                if(error){
                    return next(error);
                } else {
                    return res.status(200).send({
                        message: "Success",
                        data: results
                    });
                }
            });
        }
    });
};


exports.delete = (req, res, next) => {   
    var model = {
        accountId: req.params.id,

    };

    accountServices.deleteProducts(model, (error, results)=>{
        if(error){
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });

};