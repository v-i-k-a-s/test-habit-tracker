const mongoose = require('mongoose');


const habbitSchema = new  mongoose.Schema({
    habbit : {
        type : String,
        require : true
    },
    tracker : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Tracker'
        }
    ]
}, {
    timestamps : true
})

const Habbit = new mongoose.model('Habbit', habbitSchema);

module.exports = Habbit;