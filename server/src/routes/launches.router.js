const express = require('express');
const { getAllLaunches, postALaunch, deleteLaunch, httpAbortLaunch } = require('../controllers/launches.controllers');


const launchesRouter = express.Router();

launchesRouter.get("/", getAllLaunches);
launchesRouter.post('/', postALaunch);
launchesRouter.delete("/:id", httpAbortLaunch);
module.exports = launchesRouter;