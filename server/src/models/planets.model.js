


const { parse } = require('csv-parse');
const fs = require('fs');

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
            .on('data', (data) => {
                if (isHabitablePlanet(data)) {
                    habitablePlanets.push(data);
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', () => {
                console.log(habitablePlanets.map((planet) => {
                    return planet['kepler_name'];
                }));
                console.log(`${habitablePlanets.length} habitable planets found!`);
                resolve();
            });
    })
}




module.exports = { planets: habitablePlanets, loadPlanetsData };