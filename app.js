const { express, ioLib } = require('./libraries');
const { PORT } = require('./constants');
const { orchest } = require('./controller/controllerOrchestrator');
const app = express();
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const io = ioLib(server);

io.on('connection', orchest);