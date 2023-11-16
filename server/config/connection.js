const mongoose = require("mongoose");
//mongoose connection
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/complaints"
// );

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/complaints-db"
);

module.exports = mongoose.connection;

/*
mongodb+srv://briantrang9:tarnish9@cluster0.jgcvube.mongodb.net/complaints-db
retryWrites=true&w=majority

mongodb+srv://briantrang9:tarnish9@cluster0.jgcvube.mongodb.net/complaints
retryWrites=true&w=majority

mongodb+srv://briantrang9:tarnish9@cluster0.jgcvube.mongodb.net/graphql
retryWrites=true&w=majority

*/