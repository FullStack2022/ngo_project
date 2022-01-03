// import mongoose
import mongoose from 'mongoose';

// call schema function
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    group_name : {
        type: String,
        required : true
    },
    total_members : {
        type : Number,
        required: false
    }
},{
    timestamps: false
});

export default mongoose.model('GroupModel',groupSchema, 'groups');