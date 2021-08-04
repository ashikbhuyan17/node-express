import Blood from "../models/Blood.js";
import asyncHandler from "../middlewares/async.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";
import mongoose from 'mongoose'
import {Buffer} from 'buffer'
import path from 'path'
import sharp from "sharp";
export const requestForDonor=  asyncHandler(async (req,res,next)=>{
    //add user to req.body
    req.body.user=req.user.id;
    const user=User.findById(req.user.id)
    if(!user){
        return next(new ErrorResponse(`You have to be logged in to make a request.`,401))
    }

    const request=await Blood.create(req.body)
    res.status(201).json({
        success:true,
        data:request
    })
});
export const beADonor=  asyncHandler(async (req,res,next)=>{
    //add user to req.body
    req.body.user=req.user.id;
    //check for published request

    req.body.isDonation=true

    const request=await Blood.create(req.body)
    res.status(201).json({
        success:true,
        data:request
    })
});

export const getBloodRequests=asyncHandler(async  (req,res,next)=>{
    res.status(200).json(res.advancedResults)
})
//@desc delete
//@route GET
//@access Public
export const deleteRequest=asyncHandler(async (req,res,next)=> {
    const blood=await Blood.findOne({id:req.params.id})
    if(!blood){
        return next(new ErrorResponse(`Request not found with id of ${req.params.id}`,404))
    }
    console.log(blood.user.toString(),req.user.id)
    if(blood.user.toString()!==req.user.id){
        return next(new ErrorResponse(`User ${req.params.id} is not authorized to delete this bootcamp`,401));
    }
    blood.remove();
    res.status(200).json({
        success:true,
        data:`Succesfully removed request with the patient name of ${blood.name}`
    });
})

//@desc Get single request
//@route GET
//@access Public
export const getBloodRequest=asyncHandler(async (req,res,next)=>{
    const blood=await Blood.findOne({id:req.params.id})
    if(!blood){
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`,404))
    }
    res.status(200).json({
        success:true,
        data:blood
    })
})
//@desc upload photo for blood
//@route PUT /api/v1/item/:id/photo
//@access private
export const patientPhoto=asyncHandler(async (req,res,next)=> {
    const blood=await Blood.findById(req.params.id);
    if(!blood){
        return next(new ErrorResponse(`Item not found with id of ${req.params.id}`,404))
    }
    if(!req.files){
        return next(new ErrorResponse(`Please upload a file`,400))
    }
    const file=req.files.file;
    if(!file.mimetype.startsWith('image')){
        return next(new ErrorResponse(`Please upload an image file`,400))
    }
    if(file.size>1000000){
        return next(new ErrorResponse(`Please upload an image file less than 2MB`,400))
    }

    //create custom file name
    file.name=`photo_${req.params.id}${path.parse(file.name).ext}`
    file.mv(`./public/uploads/${file.name}`, async err=>{
        if(err){
            console.error(err)
            return next(new ErrorResponse(`problem with file upload `,500))
        }
        await Blood.findByIdAndUpdate(req.params.id,{images:file.name});
        res.status(200).json({
            success:true,
            data:file.name
        })
    })
})
export const getBunchOfDonors=asyncHandler(async (req, res, next)=> {
    const blood=await Blood.findById(req.params.id);
    if(!blood){
        return next(new ErrorResponse(`Request not found`,400))
    }
    if(blood.user.toHexString()!=req.user.id){
        return next(new ErrorResponse(`You don't own this request`,400))
    }
    const users=await User.find({'_id':{$in:blood.helpers}})

    res.status(200).json({
        success:true,
        data:users
    })



})
