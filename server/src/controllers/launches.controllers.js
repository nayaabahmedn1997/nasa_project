const launchesModel = require('../models/launches.model');
const { launchModel } = require('../models/launches.mongo');
const { getAllLunchesData } = require('../models/launches.model')
const getAllLaunches = async (req, res) => {
    const data = await getAllLunchesData();
    console.log(data);
    return res.status(200).json(data);
}
const postALaunch = async (req, res) => {
    try {
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
        const flightNumber = await launchesModel.getLatestFlightNumber() + 1;
        launch.flightNumber = flightNumber;
        launch.upcoming = true;
        console.log(launch)
        // launchesModel.addNewLaunch(launch);
        await launchesModel.saveLaunchData(launch);

        return res.status(201).json({
            "message": "Launch added successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "message": `${error.message}`
        })
    }



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

const httpAbortLaunch = async (req, res) => {
    try {
        const flightNumber = parseInt(req.params.id);

        const abortedLaunchResult = await launchModel.updateOne({
            flightNumber
        }, {
            upcoming: false,
            success: false
        });

        console.log(abortedLaunchResult); // Log the result to see the matchedCount and modifiedCount

        // Correctly check if a document was actually modified
        if (abortedLaunchResult.modifiedCount === 0) {
            // Check matchedCount to distinguish between "not found" and "already aborted"
            if (abortedLaunchResult.matchedCount === 0) {
                return res.status(404).json({ "message": "Launch not found." });
            }

        }

        return res.status(200).json({ "message": "Successfully aborted the launch" });
    } catch (error) {
        return res.status(500).json({ "message": `${error.message}` });
    }
};




module.exports =
{
    getAllLaunches,
    postALaunch,
    deleteLaunch,
    httpAbortLaunch
}
