const { express } = require('./libraries');
const { PORT } = require('./constants');
const app = express();
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// This is an unusual practice, but at the moment is required due to socket.io's needs
module.exports = {
    server
}