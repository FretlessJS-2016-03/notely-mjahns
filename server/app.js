// express stuff
var express = require( "express" );
var notelyServerApp = express();

// mongo stuff
var Note = require( "./models/note" );

// cross-origin resource sharing (CORS) middleware
notelyServerApp.use( function ( req, res, next ) {
    // send a header allowing any client to receive json
    res.header( "Access-Control-Allow-Origin", "*" );

    // now move on
    next(); 
});

notelyServerApp.get( "/", function ( req, res ) {
    // respond with the note data
    Note.find().then( function ( notes ) {
        res.json( notes );
    });
});

notelyServerApp.listen( 3030, function () {
    console.log( "Listening on http://localhost:3030" );
});
