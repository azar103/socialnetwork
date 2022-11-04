const express = require('express');
const app = express();
const userRouter = require('./routers/user');
const postRouter = require('./routers/post');
const port = process.env.DEFAULT_PORT || '5000';
const connectDB = require('./config/connectDB');
const errorHandler = require('./middlewares/errorMiddleware');
connectDB();
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use(errorHandler);
app.listen(port, (req, res) => {
    console.log(`server listenting on port ${port}...`)
})