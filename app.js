require('dotenv').config();
require('express-async-errors');
// etra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')


const express = require('express');
const app = express();

const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
const authenticatedUser = require('./middleware/authentication')

// conect DB
const connectDB = require('./db/connect')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1)
app.use(rateLimiter({
  windowMs:15*60*1000,  //15minutes
  max:100, 
}))
app.use(express.json());
// extra packages
app.use(helmet())
app.use(cors())
app.use(xss())


// app.get("/", (req, res) => {
//   res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
// });

app.use(express.static("public"));

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticatedUser, jobsRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3500;

const start = async () => {
  try {
    await connectDB(process.env.MANGO_URL)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
