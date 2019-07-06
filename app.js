const { app } = require('./config');
const { PORT } = require('./constants');
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = {
    server
}