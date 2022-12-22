const express=require("express");
const cors=require("cors");
const { userRoute } = require("./routes/user.route");
const {MongoClient}= require("mongodb")
const { blogRoute } = require("./routes/blog.route");
const { commentRoute } = require("./routes/comment.route");
const { bookmarkRoute } = require("./routes/bookmark.route");
const { likeRoute } = require("./routes/like.route");
const { followerRoute } = require("./routes/follower.route");
const connectDatabase = require("./config/db");
require("dotenv").config()
const PORT=process.env.PORT||3001
const uri = process.env.DB_URL;
const client = new MongoClient(uri);
const app=express();
app.use(express.json())

app.use(cors(
))

app.use("/",userRoute)    //user Route
app.use("/blog",blogRoute)  //blog Route
app.use("/comment",commentRoute)  //Comment Route
app.use("/bookmark",bookmarkRoute)  //BookMark Route
app.use("/like",likeRoute)          //Like Route
app.use("/follower",followerRoute)  //FollowerRoute



client.connect(err => {
    if(err){ console.error(err); return false;}
    // connection to mongo is successful, listen for requests
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
});

