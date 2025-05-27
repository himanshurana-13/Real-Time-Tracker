const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
// socket io setup
// it requirss http server pre installed in node
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

// perform ejs
app.set("view engine","ejs");
// public folder setup
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket){
    //location accept
    socket.on("send-location", function (data){
       io.emit("receive-location", {id:socket.id, ...data});
    });
    console.log("connected");
    socket.on("disconnect", function(){
         io.emit("user-disconnected",socket.id);
    });
});

app.get("/", function (req,res){
    res.render("index");
});

server.listen(3000)