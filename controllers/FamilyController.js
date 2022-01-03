// import joi
import Joi from 'joi';
import FamilyModel from '../models/FamilyModel';
import GroupModel from '../models/GroupModel';
import Handler from '../Handler/Handler';

class FamilyController{

    /**
     * function name : add_family
     * args (req, res, next)
     * return json
     */
    static async add_family(req, res, next){
        const familySchema = Joi.object({
            token_id : Joi.string().required().min(10),
            title : Joi.string().required().min(4),
            street_address : Joi.string().required(),
            address : Joi.string().required(),
            city : Joi.string().required(),
            state : Joi.string().required(),
            zip_code : Joi.string().required(),
            home_phone : Joi.string().required().min(10),
            // month : '',
            // year : '',
            // note : ''
        });

        const { error } = familySchema.validate({
            token_id : req.body.token_id,
            title : req.body.title,
            street_address : req.body.street_address,
            address : req.body.address,
            city : req.body.city,
            state : req.body.state,
            zip_code : req.body.zip_code,
            home_phone : req.body.home_phone,
        });

        // check error
        if(error){
            return next(error);
        }

        // check save data in model
        const { id, title, street_address, address, city, state, zip_code, home_phone, month, year, note } = req.body;
        let total_family_count = await FamilyModel.find();
        total_family_count = parseInt(total_family_count.length) + 1;

        const family_id = "FID-"+total_family_count;
        const result = await FamilyModel.create({
            family_id : family_id,
            title : title,
            street_address : street_address,
            address : address,
            city : city,
            state : state,
            zip_code : zip_code,
            home_phone : home_phone,
            month : month,
            year : year,
            note : note
        });

        if(result){
            return next(Handler.send_json_data('Family Add Successfully', ''));
        }
    }

    /**
     * function name : all_family_list
     * args (req, res, next)
     * return json
     */
    static async all_family_list(req, res, next){
        try {
            const result = await FamilyModel.find().sort({_id : -1});

            // data not found
            if(result.length == 0){
                return next(Handler.data_not_found('Family List Not Found.'));
            }

            // send data
            return next(Handler.send_json_data('Family List Fetch Successfully', result));

        } catch (error) {
            return next(Handler.data_not_found(error.message));
        }
    }

    /**
     * function name : delete_family
     * args (req, res, next)
     * return json
     */
     static async delete_family(req, res, next){
        const groupSchema = Joi.object({
            token_id : Joi.string().required().min(10),
            id : Joi.string().required().min(10),
        });

        const { error } = groupSchema.validate(req.body);

        // check error
        if(error){
            return next(error);
        }

        const { id } = req.body;
        // delete record in database
        try {
            const result = await FamilyModel.findByIdAndDelete({ _id : id});

            if(result){
                return next(Handler.send_json_data('Family Delete Successfully', ''));
            }

        } catch (error) {
            return next(Handler.data_not_found(error.message));
        }
    }

    /**
     * function name : search_family_members
     * args (req, res, next)
     * return json
     */
    static async search_family_members(req, res, next){
        try {
            const member_name = req.body.member_name;
            let start_date = req.body.start_date;
            let last_date = req.body.last_date;
            let result;

            start_date = new Date(new Date(start_date).setHours('00','00','00'));
            last_date = new Date(new Date(last_date).setHours('23','59','59'));
            
            if(member_name == ""){
                if(start_date != "" || last_date != ""){
                    result = await FamilyModel.find({ 
                        createdAt : { $gte : start_date, $lte : last_date}
                    });
                }
            } else{
                result = await FamilyModel.find({
                    title : { $regex: '.*' + member_name + '.*' }
                });
            }
             

            // data not found
            if(result.length == 0){
                return next(Handler.data_not_found('Family List Not Found.'));
            }

            // send data
            return next(Handler.send_json_data('Family List Fetch Successfully', result));

        } catch (error) {
            return next(Handler.data_not_found(error.message));
        }
    }

     /**
     * function name : create_group
     * args (req, res, next)
     * return json
     */
    static async create_group(req, res, next){
        const groupSchema = Joi.object({
            token_id : Joi.string().required().min(10),
            group_name : Joi.string().required().min(4),
        });

        const { error } = groupSchema.validate(req.body);

        // check error
        if(error){
            return next(error);
        }

        // check save data in model
        try {
            const result = await GroupModel.create(req.body);

            if(result){
                return next(Handler.send_json_data('Group Create Successfully', ''));
            }

        } catch (error) {
            return next(Handler.data_not_found(error.message));
        }
    }

    /**
     * function name : single_group
     * args (req, res, next)
     * return json
     */
     static async single_group(req, res, next){
        const groupSchema = Joi.object({
            token_id : Joi.string().required().min(10),
            id : Joi.string().required().min(10)
        });

        const { error } = groupSchema.validate(req.body);

        // check error
        if(error){
            return next(error);
        }

        const {id} = req.body;
        // check save data in model
        try {
            const result = await GroupModel.findOne({ _id : id});

            if(result){
                return next(Handler.send_json_data('Group Details Fetch Successfully', result));
            }else{
                return next(Handler.data_not_found('Group Details Not Found.'));    
            }

        } catch (error) {
            return next(Handler.data_not_found(error.message));
        }
    }

     /**
     * function name : edit_group
     * args (req, res, next)
     * return json
     */
      static async edit_group(req, res, next){
        const groupSchema = Joi.object({
            token_id : Joi.string().required().min(10),
            id : Joi.string().required().min(10),
            group_name : Joi.string().required().min(4),
        });

        const { error } = groupSchema.validate(req.body);

        // check error
        if(error){
            return next(error);
        }

        const {id, group_name} = req.body;
        // check save data in model
        try {
            const result = await GroupModel.findByIdAndUpdate({ _id : id}, { $set : {group_name : group_name}});

            if(result){
                return next(Handler.send_json_data('Group Update Successfully', ''));
            }

        } catch (error) {
            return next(Handler.data_not_found(error.message));
        }
    }

    /**
     * function name : delete_group
     * args (req, res, next)
     * return json
     */
     static async delete_group(req, res, next){
        const groupSchema = Joi.object({
            token_id : Joi.string().required().min(10),
            id : Joi.string().required().min(10),
        });

        const { error } = groupSchema.validate(req.body);

        // check error
        if(error){
            return next(error);
        }

        const { id } = req.body;
        // delete record in database
        try {
            const result = await GroupModel.findByIdAndDelete({ _id : id});

            if(result){
                return next(Handler.send_json_data('Group Delete Successfully', ''));
            }

        } catch (error) {
            return next(Handler.data_not_found(error.message));
        }
    }

    /**
     * function name : all_group_list
     * args (req, res, next)
     * return json
     */
     static async all_group_list(req, res, next){
        try {
            const result = await GroupModel.find().sort({_id : -1});

            // data not found
            if(result.length == 0){
                return next(Handler.data_not_found('Group List Not Found.'));
            }

            // send data
            return next(Handler.send_json_data('Group List Fetch Successfully', result));

        } catch (error) {
            return next(Handler.data_not_found(error.message));
        }
    }

    /**
     * function name : single_family_details
     * args (req, res, next)
     * return json
     */
     static async single_family_details(req, res, next){
        const groupSchema = Joi.object({
            token_id : Joi.string().required().min(10),
            id : Joi.string().required().min(10),
        });

        const { error } = groupSchema.validate(req.body);

        // check error
        if(error){
            return next(error);
        }

        const { id } = req.body;
        // delete record in database
        try {
            const result = await FamilyModel.findById({ _id : id});
            if(result != null){
                return next(Handler.send_json_data('Family Details Fetch Successfully', result));
            }else{
                return next(Handler.data_not_found('Family Details Not Found.'));    
            }

        } catch (error) {
            return next(Handler.data_not_found(error.message));
        }
    }

    /**
     * function name : update_family
     * args (req, res, next)
     * return json
     */
     static async update_family(req, res, next){
        const familySchema = Joi.object({
            token_id : Joi.string().required().min(10),
            id : Joi.string().required().min(10),
            title : Joi.string().required().min(4),
            street_address : Joi.string().required(),
            address : Joi.string().required(),
            city : Joi.string().required(),
            state : Joi.string().required(),
            zip_code : Joi.string().required(),
            home_phone : Joi.string().required().min(10),
            // month : '',
            // year : '',
            // note : ''
        });

        const { error } = familySchema.validate({
            token_id : req.body.token_id,
            id : req.body.id,
            title : req.body.title,
            street_address : req.body.street_address,
            address : req.body.address,
            city : req.body.city,
            state : req.body.state,
            zip_code : req.body.zip_code,
            home_phone : req.body.home_phone,
        });

        // check error
        if(error){
            return next(error);
        }

        const { id, title, street_address, address, city, state, zip_code, home_phone, month, year, note } = req.body;
        // check save data in model
        const result = await FamilyModel.findByIdAndUpdate({_id : id},{
            title : title,
            street_address : street_address,
            address : address,
            city : city,
            state : state,
            zip_code : zip_code,
            home_phone : home_phone,
            month : month,
            year : year,
            note : note
        });

        if(result){
            return next(Handler.send_json_data('Family Details Update Successfully', ''));
        }
    }
}

export default FamilyController;