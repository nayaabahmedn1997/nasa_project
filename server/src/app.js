const express = require('express');
const planetsRouter = require('./routes/planets.router');
const cors = require('cors');
const path = require('path');
const moragn = require('morgan');
const launchesRouter = require('./routes/launches.router');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');

app.use(cors({
    origin: "*"
}))
app.use(express.json());
app.use(express.static(publicPath));
app.use(moragn('combined'));

//Routers
app.use("/v1/planets", planetsRouter);
app.use("/v1/launches", launchesRouter);
// 1. Correctly handle specific API routes first
app.get('/api/users', (req, res) => {
    res.json({ users: ['user1', 'user2'] });
});

// This code makes sure that any request that does not matches a static file
// in the build folder, will just serve index.html. Client side routing is
// going to make sure that the correct content will be loaded.
app.use((req, res, next) => {
    const options = {
        root: publicPath
    };
    if (/ (.ico |.js |.css |.jpg |.png |.map)$/i.test(req.path)) {
        next();
    } else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile('index.html', options, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            } else {
                console.log('Sent:');
            }
        });
    }
});
// app.get("*", (_, res) => {

//     const options = {
//         root: publicPath
//     };
//     // Use res.sendFile to send the index.html file to the client
//     // The path.join function correctly builds the file path
//     // to prevent issues with different operating systems.

// });
module.exports = app;