const http = require('http');

const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchesData } = require('./models/launches.model');
const { connectMongoDB } = require('./services/mongo');

const PORT = 8000;

const server = http.createServer(app);


const startServer = async () => {
    await connectMongoDB();
    await loadPlanetsData();
    await loadLaunchesData();
}


startServer();



server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

