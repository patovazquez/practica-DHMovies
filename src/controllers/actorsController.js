const {Movie, Genre, Actor} = require("../database/models")
const {Op} = require('sequelize'); 

module.exports = {

    all: async (req, res)=> {
        try {
        const actors = await Actor.findAll({include: {all: true},
            order: [
                ["first_name", "ASC"]
            ],
        })        
        res.render("actorsAll",{actors: actors})        
        }catch(error){
            console.log(error)
        }
    },
    detail: async (req, res) => {
        try {
            const oneActor = await Actor.findByPk(req.params.idActor,{include: {all: true}} )
            const Movies = await Movie.findAll();                    
            res.render("actorDetail",{oneActor: oneActor, Movies})
        }catch(error){
            console.log(error)
        }
    },
    acting: async (req, res)=> {
        try {
        const actors = await Actor.findAll({include: {all: true}}) 
        const movies = await Movie.findAll({include: {all: true}})
              
        res.render("actingLink",{actors: actors, movies: movies})        
        }catch(error){
            console.log(error)
        }
    },
    store: async (req, res)=>{
        try {
            const movieId = req.body.movies; 
            const updateMovie = await Movie.findByPk(movieId,{include: {all: true}});
            await updateMovie.addActores(req.body.actores);

            res.redirect("/movies")  
        }catch(error){
            console.log(error)
        }
    }
}