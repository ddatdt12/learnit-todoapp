const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD),
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    );
    console.log('Database connected successfully !');
  } catch (error) {
    console.log('Database Connection: ', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
