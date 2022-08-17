const userServices = require("../services/user.services");
const upload = require("../middleware/upload");
const { model } = require("mongoose");

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



            userServices.createUser(model, (error, results)=>{
                    if(error){
                        return next(error);
                    } else {
                        return res.status(200).send("success");
                    }
                });

            
        }
    });
};


exports.findAll = (req, res, next) => {
            var model = {
                name: req.query.name,

            };

            userServices.getUser(model, (error, results)=>{
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
        userId: req.params.id,

    };

    userServices.getUserById(model, (error, results)=>{
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
                userId: req.params.id,
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                mobileNumber: req.body.mobileNumber,
                password: req.body.password,
            };

            userServices.updateUser(model, (error, results)=>{
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
        uesrId: req.params.id,

    };

    userServices.deleteUser(model, (error, results)=>{
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