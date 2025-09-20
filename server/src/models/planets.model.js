


const { parse } = require('csv-parse');
const fs = require('fs');
const { planetsModel } = require('./planets.mongo');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}


function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream('./src/data/kepler_data.csv')
            .pipe(parse({ // Now, 'parse' is a function and this line will work
                comment: '#',
                columns: true,
            }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                    await savePlanet(data);
                    // habitablePlanets.push(data)
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', () => {


                resolve();
            });
    })
}

const savePlanet = async (data) => {

    try {
        await planetsModel.updateOne({ keplerName: data.kepler_name }, {
            keplerName: data.kepler_name
        },

            { upsert: true });
    } catch (error) {
        console.log(error);
    }

}

const getAllPlanetsName = async () => {
    return await planetsModel.find({}, {
        '__v': 0
    });
}


module.exports = {
    loadPlanetsData,
    getAllPlanetsName
}