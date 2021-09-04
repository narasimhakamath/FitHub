const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

const UserServiceRoutes = require('./routes/UserService');

app.use(express.json());
app.use(cookieParser());

app.use(morgan('dev'));

app.use('/api/v1/user-service', UserServiceRoutes);

const PORT = 3000;

const server = app.listen(PORT, console.log(`API Gateway server running on port: ${PORT}`));

process.on('unhandledRejection', (error, promise) => {
	console.log(`Error: ${error['message']}`);
	server.close(() => process.exit(1));
});