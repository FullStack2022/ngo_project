class PageNotFound{

    // page_not_found static function
    static page_not_found(req, res){
        res.status(404).json({
            'status' : 404,
            'message' : 'Try Again ! Invalid Api',
            'data' : ''
        });
    }


}

export default PageNotFound;
