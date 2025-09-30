const { launchModel } = require("./launches.mongo");
const planets = require('./planets.mongo');
const axios = require('axios');
const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";
const launches = new Map();
let latestFlightNumber = 200;
const launch = {
    flightNumber: 101,
    mission: 'adadadad',
    rocket: "adadad",
    launchDate: new Date('December 27 2005'),
    upcoming: true,
    success: true,
    customers: [
        "ZTM",
        "NASA"
    ],
    destination: "Zolor"
};
// saveLaunchData(launch);

launches.set(launch.flightNumber, launch);




const getAllLunchesData = async () => {
    // return Array.from(launches.values())
    return await launchModel.find({});
}

const addNewLaunch = (launch) => {

    const flightNumber = latestFlightNumber++;
    launches.set(flightNumber, Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['ZTM'],
        flightNumber: flightNumber
    }));


}


const launchExitsWithId = (launchId) => {
    return launches.has(launchId);
}

const abortLaunchById = (launchId) => {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

const httpAbortLaunchById = async (launchId) => {
    const aborted = await launchModel.updateOne({ flightNumber: launchId }, {
        success: false
    });

}

async function saveLaunchData(launch) {

    const planet = await planets.planetsModel.findOne({
        keplerName: launch.destination
    });

    if (!planet) {
        throw new Error('No matching planet was found');
    }

    else {
        launch.destination = planet._id;
        await launchModel.updateOne({
            flightNumber: launch.flightNumber,
        }, launch, {
            upsert: true
        })
    }

}

const getLatestFlightNumber = async () => {
    const latestlaunchData = await launchModel.findOne().sort('-flightNumber');
    if (!latestlaunchData) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestlaunchData.flightNumber;
}

const loadLaunchesData = async () => {
    console.log("Downloading launches Data");

    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        'customers': 1
                    }
                }
            ]
        }
    });
    const launchesDocs = (await response.data).docs;
    // console.log(launchesDocs)
    for (const launchDoc of launchesDocs) {

        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        })

        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc["name"],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers
        }
    }
}

module.exports = {
    getAllLunchesData,
    addNewLaunch,
    launchExitsWithId,
    abortLaunchById,
    saveLaunchData,
    getLatestFlightNumber,
    loadLaunchesData
};

