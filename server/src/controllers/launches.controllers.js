const launchesModel = require('../models/launches.model');
const getAllLaunches = (req, res) => {
    return res.status(200).json(launchesModel.getAllALunches());
}
const postALaunch = (req, res) => {

    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.destination) {
        return res.status(400).json({
            error: "Missing required launch property"
        })
    }
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch Date'
        })
    }

    launchesModel.addNewLaunch(launch);

    return res.status(201).json({
        "message": "Launch added successfully"
    })


}

const deleteLaunch = (req, res) => {
    const launchId = req.params.id;

    if (launchesModel.launchExitsWithId(launchId)
    ) {
        const aborted = launchesModel.abortLaunchById(launchId);
        //if launch does exist
        return res.status(200).json(aborted)
    }
    else {

        //if launch doesn't exist
        return res.status(404).json({
            error: 'Launch not found'
        })

    }


}

module.exports =
{
    getAllLaunches,
    postALaunch,
    deleteLaunch
}
