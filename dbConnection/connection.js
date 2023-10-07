
const mongoose = require("mongoose")

const connectDb = async ()=>{
const uri = "mongodb://localhost:27017/productDb"
mongoose.connect(
    uri
  ).catch((e) => {
    console.log("error connecting to mongoose!");
  });
  mongoose.connection.on("error", (e) => {
    console.log("mongo connect error!");
  });
  mongoose.connection.on("connected", () => {
    console.log("connected to mongo");
  });
}

const closeConnection = ()=>{
  mongoose.disconnect()
  .then(() => {
    console.log('Connection closed successfully.');
  })
  .catch((err) => {
    console.error('Error while closing connection:', err);
  });
}

module.exports = {connectDb , closeConnection}


