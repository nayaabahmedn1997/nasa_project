const { getAllPlanetsName } = require("../models/planets.model");




const getAllPlanets = async (req, res) => {
    res.status(200).json(await getAllPlanetsName());
}




module.exports = {
    getAllPlanets
}