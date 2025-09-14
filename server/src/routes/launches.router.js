const express = require('express');
const { getAllLaunches, postALaunch, deleteLaunch } = require('../controllers/launches.controllers');


const launchesRouter = express.Router();

launchesRouter.get("/", getAllLaunches);
launchesRouter.post('/', postALaunch);
launchesRouter.delete("/:id", deleteLaunch);
module.exports = launchesRouter;