const http = require('http');
const app = require('./app');
const { loadPlanetsData, planets } = require('./models/planets.model');

const PORT = 8000;
const server = http.createServer(app);

const startServer = async () => {
    await loadPlanetsData();
}


startServer();


console.log(`Server is listening on port ${PORT}`);
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

