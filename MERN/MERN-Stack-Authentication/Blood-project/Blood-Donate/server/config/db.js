import mongoose from 'mongoose'
import colors from 'colors'

//connecting to mongodb
const connectDB = async () => {
    // const conn=await mongoose.connect(process.env.MONGO_URI,{
    //     useNewUrlParser:true,
    //     useCreateIndex:true,
    //     useFindAndModify:false,
    //     useUnifiedTopology:true
    // })
    // console.log(`mongoDB connected: ${conn.connection.host}`.cyan.bold)
    mongoose.set('useCreateIndex', true);
    mongoose.connect('mongodb://localhost:27017/blood-donation', {    //contacts-db => documents     and table = collection
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = mongoose.connection
    // console.log(db);
    db.on('error', (err) => {
        console.log(err);
    })
    db.once('open', () => {
        console.log("database connection done  ");
    })


}
export default connectDB
