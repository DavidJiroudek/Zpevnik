const mongoose = require('mongoose')
const validator = require('validator')

const Song = mongoose.model('Song', {
    songName: {
        type: String,
        required: true,
        trim: true
    },
    interpret: {
        type: String,
        required: true,
        trim: true
    },
    priority: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0 && value > 5) {
                throw new Error('Priority set incorrectly')
            }
        }
    },
    capo: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0 && value > 10) {
                throw new Error('Capo set incorrectly')
            }
        }
    },
    processedText: {
        type: String,
        required: true
    }
})

module.exports = Song