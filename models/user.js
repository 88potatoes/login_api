import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 4
    },
    role: {
        type: String,
        default: "none"
    }
});

const User = new mongoose.model("User", UserSchema);

export default User;
