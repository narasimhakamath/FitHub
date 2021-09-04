const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const connectDB = async () => {
	const connection = await mongoose.connect(`mongodb://user-mongo/users-service`, {useNewUrlParser: true, useUnifiedTopology: true});
	// console.log(`User Service MongoDB connected to ${connection['connection']['host']}`);
};
connectDB();


const usersRoute = require('./routes/users');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(morgan('dev'));

app.use(`/api/users`, usersRoute);

const PORT = 4000;

const server = app.listen(PORT, console.log(`The user-service is running on port: ${PORT}`));

process.on('unhandledRejection', (error, promise) => {
	console.log(`Error: ${error['message']}`);
	server.close(() => process.exit(1));
});