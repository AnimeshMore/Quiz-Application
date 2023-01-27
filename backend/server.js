const app=require('./app');
const connectDatabase = require('./config/database')

//Handle uncaught exceptions
process.on('uncaughtException', err =>{
    console.log('ERROR:', err.stack);
    console.log('Shutting down the server due to uncaught exceptions');
    process.exit(1);
})

const dotenv=require('dotenv');
dotenv.config({path:"backend/config/config.env"});

connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

//Handle Unhandle Promise Rejections
process.on('unhandledRejection', err=> {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(() => process.exit(1));

});