const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }] 
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    console.log(user);
    const token = jwt.sign({ _id: user._id.toString() }, 'definitelySecret')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findUser = async (username, password) => {
    console.log("second");
    const user = await User.findOne({ username })

    if (!user) {
        return(false);
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return(false);
    }

    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})
 
const User = mongoose.model('User', userSchema)
module.exports = User