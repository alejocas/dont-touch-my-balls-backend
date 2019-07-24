const { express, ioLib } = require('./libraries');
const { PORT } = require('./constants');
const { orchest } = require('./controller/controllerOrchestrator');
const app = express();
const portInUse = process.env.PORT ? process.env.PORT : PORT; 
const server = app.listen(portInUse, () => console.log(`Server running on port ${PORT}`));
const io = ioLib(server);

io.on('connection', orchest);