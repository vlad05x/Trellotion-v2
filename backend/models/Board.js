const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, 
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date 
    }
}, {
    timestamps: true, 
});

boardSchema.index({ user: 1 });

module.exports = mongoose.model('Board', boardSchema);
