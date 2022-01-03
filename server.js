// import express framework
import express from 'express';

// import mongoose
import mongoose from 'mongoose';

// import route file
import route from './config/routes';

// import middlewares
import ErrorHandler from './middlewares/ErrorHandler';

// import cors
import cors from 'cors';

// call express function
const app = express();

// connect db
const DB_STRING = "mongodb://localhost:27017/ngo_project";
mongoose.connect(DB_STRING, {useNewUrlParser :  true});
mongoose.set('debug', false);
const con = mongoose.connection;
con.on('error', () => { console.log('connection error'); });
con.once('open', () => { console.log('db connect'); });

// call json function
app.use(express.json());

// use cors
app.use(cors());

// use route file
app.use('/apis',route);

// use error handler
app.use(ErrorHandler);


if(process.env.NODE_ENV == 'production')
{
    app.use(express.static('client_side/build'));
}

// call listen function for server
app.listen(5000, () => {
    console.log('node js server started on 3000 port');
});