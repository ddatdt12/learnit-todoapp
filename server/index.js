const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const connectDB = require('./database');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const errorHandler = require('./middlewares/errorHandler');
const AppError = require('./utils/AppError');

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

connectDB();

app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

app.all('*', (req, res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server`,
    404,
  );
  next(error);
});

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
