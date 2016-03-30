var express = require( "express" );
var notelyServerApp = express();

// cross-origin resource sharing (CORS) middleware
notelyServerApp.use( function ( req, res, next ) {
    // send a header allowing any client to receive json
    res.header( "Access-Control-Allow-Origin", "*" );

    // now move on
    next(); 
});

notelyServerApp.get( "/", function ( req, res ) {
    // respond with json
    res.json( [
        {
            title: "hardcoded note",
            body_html: "foo"
        },
        {
            title: "another hardcoded note",
            body_html: "bar"
        }
    ]);
});

notelyServerApp.listen( 3030, function () {
    console.log( "Listening on http://localhost:3030" );
});
