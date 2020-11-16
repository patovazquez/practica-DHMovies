const {Movie, Genre, Actor} = require("../database/models")
const {Op} = require('sequelize'); 

module.exports = {

    all: async (req, res)=> {
        try {
        const genres = await Genre.findAll({include: {all: true},
            order: [
                ["name", "DESC"]
            ],
        })        
        res.render("genresAll",{genres: genres})        
        }catch(error){
            console.log(error)
        }
    },
    detail: async (req, res) => {
        try {
            const oneGenre = await Genre.findByPk(req.params.idGenre,{include: {all: true}} )
            const Movies = await Movie.findAll();                    
            res.render("genreDetail",{oneGenre: oneGenre, Movies})
        }catch(error){
            console.log(error)
        }
    },
}