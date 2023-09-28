const {Movie, Genre, Actor} = require("../database/models")
const {Op} = require('sequelize'); 
const moment = require('moment');
let {check, validationResult, body} = require('express-validator'); 

module.exports = {

    all: async (req, res)=> {
        try {
        const movies = await Movie.findAll({include: {all: true}})        
        res.render("moviesAll",{movies: movies})
        }catch(error){
            console.log(error)
        }
    },
    detail: async (req, res) => {
        try {
            const oneMovie = await Movie.findByPk(req.params.idMovie,{include: {all: true}} )
            const actores = await Actor.findAll();                    
            res.render("moviesDetail",{oneMovie: oneMovie, actores})
        }catch(error){
            console.log(error)
        }
    },
    new: async (req, res) => {
        try {
            const movies = await Movie.findAll({
                order: [
                    ["release_date", "DESC"]
                ],
                limit: 5
            })            
            res.render("moviesNew",{movies: movies})    
            }catch(error){
                console.log(error)
            }    
    },
    calendar: async (req, res) => {
        try {
            const fechaHoy = moment().calendar("MMM Do YY"); /*esto agrega la fecha de hoy*/
            const fechaHoyOk = moment(fechaHoy).format("DD-MM-YYYY")
            const movies = await Movie.findAll({
              
                order: [
                    ["release_date", "DESC"]
                ]
            
            })            
            res.render("calendar",{movies: movies, fechaHoyOk})    
            }catch(error){
                console.log(error)
            }    
    },
    recom: async (req, res) => {
        try {
            const movies = await Movie.findAll({
               where: {
                   rating: {[Op.gte] : 8}
                },
                order: [
                    ["rating", "DESC"]
                ]       
            })         
            res.render("moviesRecom",{movies: movies})    
            }catch(error){
                console.log(error)
            }    
    },
    search: async (req, res) => {
            try {
                let peliBuscada = req.body.pelicula;
                let orden = req.body.Orden;                          
                const movies = await Movie.findAll({
                   where: {
                       title: { [Op.like] : "%" + peliBuscada +"%" },                   
                    },
                    order: [
                       [orden, "DESC"]
                    ]                    
                })
                console.log(req.body)             
                res.render("moviesSearch",{movies: movies, orden})        
                }catch(error){
                    console.log(error)
                }        
    },        
    create: async (req, res)=> {
            try{
            const generos = await Genre.findAll();
            const actores = await Actor.findAll();
            res.render('create', {generos, actores} )
            }catch(error){
                console.log(error)
            }
    },
    store: async (req, res)=> {

        let resultado = validationResult(req); 

        if (resultado.isEmpty()){

                try{
                    
                const newMovie = await Movie.create(req.body)
                await newMovie.addActores(req.body.actores)
                }catch(error){
                    console.log(error)
                }
                
            res.redirect("../movies") 
        }else{
            const generos = await Genre.findAll();
            const actores = await Actor.findAll();
            res.render('create', {generos, actores, errors: resultado.errors})            
	} 

    },   
    edit: async (req, res) => {
        
        try {
            const oneMovie = await Movie.findByPk(req.params.idMovie,{include: {all: true}} )
            const generos = await Genre.findAll();
            const actores = await Actor.findAll();
            const fecha = moment(oneMovie.release_date).format('YYYY-DD-MM');
                              
            res.render("update",{oneMovie: oneMovie, actores, generos, fecha: fecha})

        }catch(error){
            console.log(error)
        }
    },
    update: async (req, res) => {

        let resultado = validationResult(req); 

        if (resultado.isEmpty()){
            try {
                const movieId = req.params.idMovie; 
                const updateMovie = await Movie.findByPk(movieId,{include: {all: true}});
                await updateMovie.removeActores(updateMovie.actores);
                await updateMovie.addActores(req.body.actores);
                await updateMovie.update(req.body);

                res.redirect("/movies")  
            }catch(error){
                console.log(error)
            } 
        }else{
            const oneMovie = await Movie.findByPk(req.params.idMovie,{include: {all: true}} )
            const generos = await Genre.findAll();
            const actores = await Actor.findAll();
            const fecha = moment(oneMovie.release_date).format('YYYY-DD-MM');
                              
            res.render("update",{oneMovie: oneMovie, actores, generos, fecha: fecha, errors: resultado.errors})
        }      
    },
    destroy: async (req, res) => {
        try {
            const movieId = req.params.idMovie; 
            const deleteMovie = await Movie.findByPk(movieId,{include: {all: true}});
            await deleteMovie.removeActores(deleteMovie.actores);
            deleteMovie.destroy({
                where: {
                    id: movieId
                }
            })             
            res.redirect("/movies")  
        }catch(error){
            console.log(error)
        }        
    },    
}


