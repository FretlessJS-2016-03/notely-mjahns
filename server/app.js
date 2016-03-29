var express = require( "express" );
var app = express();

app.get( "/", function ( req, res ) {
    res.send( "foo" );    
});

app.listen( 3737, function () {
    console.log( "Listening on http://localhost:3737" );
});
