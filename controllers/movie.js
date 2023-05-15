const uniqid = require("uniqid");
const MovieModel = require("../models/movie");
const UserModel = require("../models/user");


module.exports.ADD_MOVIE = async (req, res) => {
    try {
        const movie = new MovieModel({
            title: req.body.title,
            contentText: req.body.contentText,
            status: false,
            id: uniqid(),
            creationDate: new Date(),
        })
    
        const createdMovie = await movie.save();
    
        UserModel.updateOne(
            {id: req.body.userId},
            {$push: {userMoviesIds: createdMovie.id}}
        ).exec();
    
        return res.status(200).json({response: "The movie was added successfully"});

    } catch (err) {
        return res.status(500).json({response: "Error, please try later"});
    }
}


module.exports.GET_MOVIES = async (req, res) => {
    try{
        const movies = await MovieModel.find();
        res.status(200).json({movies: movies});
    } catch (err) {
        console.log("Err:", err);
        res.status(500).json({response: "Error, please try later"});
    }
}


module.exports.GET_MOVIE = async (req, res) => {
    try {
        const movies = await MovieModel.findOne({id: req.params.id});
        res.status(200).json({movies: movies});
    } catch (err) {
        console.log("Err:", err)
        res.status(500).json({response: "Error, please try later"});
    }
}


module.exports.EDIT_MOVIE_TITLE = async (req, res) => {
    try {
        const updateMovieTitle = await MovieModel.findOneAndUpdate(
            {id: req.params.id},
            {title: req.body.title}
        );
        res.status(200).json({movie: "Movie title was updated successfully"});
    } catch (err) {
        res.status(500).json({response: "Error, please try later"});
    }
}


module.exports.EDIT_MOVIE_CONTENT = async (req, res) => {
    try {
        const updateMovieContent = await MovieModel.findOneAndUpdate(
            {id: req.params.id},
            {contentText: req.body.contentText}
        );
        res.status(200).json({movie: "Movie content was updated successfully"});
    } catch (err) {
        res.status(500).json({response: "Error, please try later"});
    }
}


module.exports.CHANGE_MOVIE_STATUS = async (req, res) => {
    try {
        const movie = await MovieModel.findOne({id: req.params.id});

        const updateMovieStatus = await MovieModel.findOneAndUpdate(
            {id: req.params.id},
            {status: !movie.status},
            {new: true}
        );
        res.status(200).json({movie: "Movie status was updated successfully"});
    } catch (err) {
        res.status(500).json({response: "Error, please try later"});
    }
}


module.exports.DELETE_MOVIE = async (req, res) => {
    try {
        const movie = await MovieModel.findOneAndDelete({id: req.params.id});
        res.status(200).json({response: "The movie was deleted successfully"});
    } catch (err) {
        res.status(500).json({response: "Error, please try later"});
    }
}