const mongoose = require('mongoose');


const trackerSchema = new mongoose.Schema({
    habbit : {
        type : mongoose.Schema.ObjectId,
        ref : 'Habbit'
    },
    status : {
        type : String,
        require : true
    },
    streakCount : {
        type : Number,
        default : 0
    },
    day : {
        type : String,
        require : true
    },
    date : {
        type: String,
        require : true
    }
}, {
    timestamps : true
});

const Tracker = new mongoose.model('Tracker', trackerSchema);

module.exports  = Tracker;

