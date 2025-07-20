const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      message: "Connection requests fetched successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    let loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser, status: "accepted" },
        { fromUserId: loggedInUser, status: "accepted" },
      ],
    }).populate("fromUserId", ["firstName", "lastName"]).populate("toUserId", ["firstName", "lastName"]);


    const data = connectionRequests.map((row) => {
      const fromUser = row.fromUserId;
      const toUser = row.toUserId;

      if (fromUser && fromUser._id && fromUser._id.toString() === loggedInUser._id.toString()) {
        return toUser;
      }

      return fromUser;
    });
    console.log(data)
    res.json({
      message: "Connection fetched Successfully",
      data: data,
    });
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    // loggedin user should not see below in the feed
    // his own car
    // his connections
    // ignored people
    // already sent the connection request

    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId").populate("fromUserId", "firstName").populate("toUserId", "firstName");

    //find all connections request (sent+received)
    const hideUsersFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFeed.add(req.fromUserId);
      hideUsersFeed.add(req.toUserId);
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(['firstName', 'lastName']).skip(skip).limit(limit)


    res.send(users);
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

module.exports = userRouter;