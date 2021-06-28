
const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const MONGOURI = "mongodb+srv://kpraj:123456@kp@cluster0.wc8t0.mongodb.net/projectxx?retryWrites=true&w=majority";


const InitiateMongoServer = async () => {
  try {
    mongoose.set('useFindAndModify', false);
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    },{ useFindAndModify: false });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;