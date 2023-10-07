const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/testDb')
mongoose.connection.on("connected" , ()=>{
    console.log("connected successfully")
})

// // Initialize the mongoose-auto-increment plugin
// autoIncrement.initialize(mongoose.connection);

// const Schema = mongoose.Schema;

// const yourSchema = new Schema({
//     name : String,
//   id: { type: String, unique: true },
// });

// // Apply the auto-increment plugin to your schema
// yourSchema.plugin(autoIncrement.plugin, {
//   model: 'YourModelName', // The name of your model
//   field: 'id', // The name of the auto-incrementing field
//   startAt: `BANKP101`, // The initial value for the auto-incrementing field
//   incrementBy: 1, // The increment step
// });

// // Create your model using the schema
// const YourModelName = mongoose.model('YourModelName', yourSchema);


//  new YourModelName({
//     name : "hari shyam"
// }).then((result) => {
//     console.log("result" , result)
// }).catch((err) => {
//     console.log("error " , error)
// });
