const mongoose = require('mongoose');

// Define Schemes
const moneySchema = new mongoose.Schema({
    category: String,
    contents: String,
    price: String,
    etc: String
},
    {
        timestamps: true
    });

// Create new todo document
moneySchema.statics.create = function (payload) {
    // this === Model
    const todo = new this(payload);
    // return Promise
    return todo.save();
};

// Find All
moneySchema.statics.findAll = function () {
    // return promise
    // V4부터 exec() 필요없음
    return this.find({});
};

// Find One by todoid
moneySchema.statics.findOneByTodoid = function (todoid) {
    return this.findOne({ todoid });
};

// Update by todoid
moneySchema.statics.updateByTodoid = function (todoid, payload) {
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.findOneAndUpdate({ todoid }, payload, { new: true });
};

// Delete by todoid
moneySchema.statics.deleteByTodoid = function (todoid) {
    return this.remove({ todoid });
};

// Create Model & Export
module.exports = mongoose.model('Money', moneySchema);