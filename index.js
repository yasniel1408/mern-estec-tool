const express  = require('express');
const morgan = require('morgan');
const path = require('path')
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require('cors');
require('./db/db');
require('./socket/socket')(io);

//Settings
app.set('port', process.env.PORT || 4000);

//Middelewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())
// app.use((req, res, next) => {
//     res.set("Access-Control-Allow-Credentials", "true");
//     res.set("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.set("Access-Control-Allow-Headers", "Content-Type");
//     res.set("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
//     next();
// });


//Routes
app.use('/api',require("./routes/api"));

//Static files 
app.use(express.static(path.join(__dirname, "public")));
//Static file declaration
app.use(express.static(path.join(__dirname, "client/build")));


//build mode
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

//Starting the server
http.listen(app.get('port'), function() {
    console.log(`Server running on *:${app.get('port')}`);
});