const express = require('express');
const requestRouter  = express.Router()

const User = require('../models/user');
const {userAuth} =  require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');

requestRouter.post('/request/send/:status/:toUserId', userAuth, async(req,res) =>{
    try{
        var fromUserId = req.user._id;
        var toUserId = req.params.toUserId;
        var status = req.params.status;

        var allowedStatus = ["interested","ignored"];

        let isAllowedStatus = allowedStatus.includes(status);
        if(!isAllowedStatus){
            return res.send({
                message:"Invalid Status" + status,
            })
        }

        let toUserPresent = await User.findById(toUserId);
        if(!toUserPresent){
            return res.status(400).send({
                message:"User does not exists"
            })
        }

        const exisitingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId : fromUserId}
            ]
        })
        if(exisitingConnectionRequest){
            return res.status(400).send({
                message:"Connection request already exisits"
            })
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        let data = await connectionRequest.save();
        res.send({
            message: req.user.firstName + " is " + status + " in " + toUserPresent.firstName,
            data
        })

    }catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})

requestRouter.post('/request/review/:status/:requestId', userAuth, async(req,res) =>{
    try{
        const loggedInUser = req.user;
        const {status, requestId} = req.params;

        const allowedStatus = ["accepted", "rejected"];

        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message:" Status not allowed"
            })
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id : requestId,
            toUserId: loggedInUser._id,
            status : "interested"
        })

        if(!connectionRequest){
            return res.status(400).json({
                message:"Connection request not found"
            })
        }

        connectionRequest.status = status;

      const data =  await connectionRequest.save()

      res.status(200).json({
        message:"Connection request " + status + data
      })
    }catch(err){
        res.status(400).send("ERROR " + err.message)
    }
})

module.exports = requestRouter;