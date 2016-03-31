require( "dotenv" ).load();

// express stuff
var express = require( "express" );
var notelyServerApp = express();

// mongo stuff
var Note = require( "./models/note" );

// http-to-json parsing middleware 
var bodyParser = require( "body-parser" );
notelyServerApp.use( bodyParser.json() );

// cross-origin resource sharing (CORS) middleware
notelyServerApp.use( function ( req, res, next ) {
    // send a header allowing any client to receive json
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization" );

    // now move on
    next(); 
});

notelyServerApp.get( "/notes", function ( req, res ) {
    // respond with the note data
    Note.find().then( function ( notes ) {
        res.json( notes );
    });
});

notelyServerApp.post( "/notes", function ( req, res ) {
    var note = new Note( {
        title: req.body.note.title,
        body_html: req.body.note.body_html
    });

    note.save().then( function ( noteData ) {
        res.json( {
           message: "Saved!",
           note: noteData
        });
    });
});

notelyServerApp.listen( 3030, function () {
    console.log( "Listening on http://localhost:3030" );
});
