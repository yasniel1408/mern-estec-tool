const mongoose = require('mongoose');

let URI = "";

    URI = 'mongodb://localhost/estecTool';

mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => console.log("DB is connected"))
    .catch(err => console.error(err));

module.exports = mongoose;