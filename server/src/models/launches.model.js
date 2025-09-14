

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


launches.set(launch.flightNumber, launch);


const getAllALunches = () => {
    return Array.from(launches.values())
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

module.exports = {
    getAllALunches,
    addNewLaunch,
    launchExitsWithId,
    abortLaunchById
};