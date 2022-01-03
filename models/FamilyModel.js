// import mongoose
import mongoose from 'mongoose';

// call schema function
const Schema = mongoose.Schema;

const familySchema = new Schema({
    family_id : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    street_address : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    zip_code : {
        type : String,
        required : true
    },
    home_phone : {
        type : String,
        required : true
    },
    month : {
        type : String,
        required : false,
        default : ''
    },
    year : {
        type : String,
        required : false,
        default : ''
    },
    note : {
        type : String,
        required : false,
        default : ''
    },
},
{
    timestamps : true
});

export default mongoose.model('FamilyModel', familySchema, 'families');