class Handler extends Error{
    // call constructor
    constructor(status, message, data = ''){
        super();
        this.status = status;
        this.message = message;
        this.data = data;
    }

    /** 
     * function : data_not_found
     * args (message)
     * return new object
     * */ 
    static data_not_found(message){
        return new Handler(404, message);
    }

    /** 
     * function : send_json_data
     * args (message)
     * return new object
     * */ 
     static send_json_data(message, data){
        return new Handler(200, message, data);
    }

    /** 
     * function : empty_value
     * args (message)
     * return new object
     * */ 
     static empty_value(message){
        return new Handler(200, message);
    }
}

export default Handler;